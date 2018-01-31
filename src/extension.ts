'use strict';
// 模块“vscode”包含VS代码扩展性API
// 导入模块并在下面的代码中使用别名vscode引用它
import {
    window,
    workspace,
    commands,
    Disposable,
    ExtensionContext,
    StatusBarAlignment,
    StatusBarItem,
    TextDocument
} from 'vscode';
import * as WebRequest from 'web-request';
// 当你的扩展被激活时，这个方法被调用
// 你的扩展在命令执行的第一次被激活
let isActive = false;
// 翻译结果
let translateResult = '';
// 将谷歌语言码转换为百度语言码
const google2baidu = {
        en: 'en',
        th: 'th',
        ru: 'ru',
        pt: 'pt',
        el: 'el',
        nl: 'nl',
        pl: 'pl',
        bg: 'bul',
        et: 'est',
        da: 'dan',
        fi: 'fin',
        cs: 'cs',
        ro: 'rom',
        sl: 'slo',
        sv: 'swe',
        hu: 'hu',
        de: 'de',
        it: 'it',
        zh: 'zh',
        'zh-CN': 'zh',
        'zh-TW': 'cht',
        'zh-HK': 'yue',
        ja: 'jp',
        ko: 'kor',
        es: 'spa',
        fr: 'fra',
        ar: 'ara'
    };
/**
 * 激活函数
 * @param context
 */
export function activate(context: ExtensionContext) {
    // 使用控制台输出诊断信息（console.log）和错误（console.error）
    // 当你的插件被激活时，这行代码将只执行一次
    context.subscriptions.push(new Translate());
    // 插入翻译指令
    context.subscriptions.push(
        commands.registerCommand('extension.translate', () => {
            if (!isActive) {
                window.showInformationMessage('打开翻译');
                isActive = true;
            } else {
                window.showInformationMessage('关闭翻译');
                isActive = false;
            }
        })
    );
    // 插入替换指令
    context.subscriptions.push(
        commands.registerCommand('extension.translateReplace', () => {
            if (!isActive) { return; }
            let editor = window.activeTextEditor;
            let selection = editor.selection;
            editor.edit(edit => edit.replace(selection, translateResult));
        })
    );
}

// 当您的插件被停用时，此方法被调用
export function deactivate() { }

/**
 * 翻译类
 */
class Translate {

    private statusBarItem: StatusBarItem;
    private disposable: Disposable;
    /**
     * 构建函数
     */
    constructor() {
        if (!this.statusBarItem) {
            this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this.updateTranslate, this, subscriptions);
        this.disposable = Disposable.from(...subscriptions);
        this.updateTranslate();
        this.statusBarItem.show();
    }
    /**
     * 更新翻译
     */
    public updateTranslate() {
        const cfg = workspace.getConfiguration();
        let proxy = String(cfg.get("http.proxy"));
        let api = String(cfg.get("translation.api"));
        let targetLanguage = String(cfg.get("translation.targetLanguage"));
        let fromLanguage = String(cfg.get("translation.fromLanguage"));
        let languageDetection = Boolean(cfg.get("translation.languageDetection"));
        let editor = window.activeTextEditor;
        if (!isActive || !editor) {
            return this.statusBarItem.hide();
        }
        let doc = editor.document;
        let str = doc.getText(editor.selection).trim();
        if (str.trim() == '') return;
        setTimeout(() => {
            if (languageDetection) {
                this.languageDetection(str, fromLanguage).then((isReverse) => {
                    if (isReverse) {
                        [fromLanguage, targetLanguage] = [targetLanguage, fromLanguage];
                    }
                    this.dotranslate(encodeURIComponent(str), proxy, api, targetLanguage, fromLanguage);
                })
            } else {
                this.dotranslate(encodeURIComponent(str), proxy, api, targetLanguage, fromLanguage);
            }
        }, 1000);
    }
    /**
     * 翻译函数
     * * 调用接口，返回翻译结果，写入状态栏
     * @param str 内容
     * @param proxy 代理
     * @param api 接口 默认百度 也可以是谷歌
     * @param targetLanguage 目标语言
     * @param fromLanguage 源语言
     */
    private dotranslate(str, proxy, api, targetLanguage, fromLanguage) {
        let statusBarItem = this.statusBarItem;
        let translateStr = this.baiduTranslate(str, google2baidu[targetLanguage], google2baidu[fromLanguage])
        if (api == 'google'){
            translateStr = this.googleTranslate(str, targetLanguage, fromLanguage)
        }
        WebRequest.get(translateStr, { "proxy": proxy }).then(function (TResult) {
            let rs = '';
            let res = JSON.parse(TResult.content.toString());
            if (api == 'baidu') {
                if (res.error) return;
                rs = res.trans_result.data[0].dst;
            } else {
                var result = []
                res.sentences.forEach(v => {
                    result.push(v.trans)
                })
                rs = result.join(',');
            }
            statusBarItem.text = translateResult = rs;
            statusBarItem.show();
        });
    }
    /**
     * 语言检测
     * @param str 文字
     * @param fromLanguage 源语言
     */
    private languageDetection(str, fromLanguage) {
        return WebRequest.post('http://fanyi.baidu.com/langdetect',
            {
                "formData": { "query": str }, "timeout": 500
            }
        ).then(function (result) {
                var res = JSON.parse(result.content);
                if (res.error || res.lan == fromLanguage || fromLanguage == '') {
                    return false;
                } else {
                    return true;
                }
            },
            function () {
                return false;
            }
        );
    }
    /**
     * 百度翻译接口
     */
    private baiduTranslate(str, targetLanguage, fromLanguage) {
        return `http://fanyi.baidu.com/v2transapi?query=${str}&from=${fromLanguage}&to=${targetLanguage}`;
    }
    /**
     * 谷歌翻译接口
     */
    private googleTranslate(str, targetLanguage, fromLanguage) {
        fromLanguage = fromLanguage || 'auto';
        targetLanguage = targetLanguage || 'auto';
        return `https://translate.google.cn/translate_a/single?client=gtx&sl=${fromLanguage}&tl=${targetLanguage}&hl=zh-CN&dt=t&dt=bd&ie=UTF-8&oe=UTF-8&dj=1&source=icon&q=${str}`;
    }
    /**
     * 处置
     */
    dispose() {
        this.statusBarItem.dispose();
        this.disposable.dispose();
    }
}
