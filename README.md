# vscode-translate

[![Current Version](https://vsmarketplacebadge.apphb.com/version/chun.vscode-translate.svg)](https://marketplace.visualstudio.com/items?itemName=chun.vscode-translate)
[![Install Count](https://vsmarketplacebadge.apphb.com/installs/chun.vscode-translate.svg)](https://marketplace.visualstudio.com/items?itemName=chun.vscode-translate)
[![Open Issues](https://vsmarketplacebadge.apphb.com/rating/chun.vscode-translate.svg)](https://marketplace.visualstudio.com/items?itemName=chun.vscode-translate)

## 安装插件

插件->从VSIX安装->选择vscode-translate-1.0.0.vsix

## 快捷键设置

首选项->键盘快捷方式->搜索 `translate`

* extension.translate  Ctrl+t
* extension.translateReplace Ctrl+Shift+r
* 
## 语言翻译

按 CTRL + t 打开翻译 那么你可以选择文本并查看statusBar的更改。
按 CTRL + t 关闭该功能。

### 似乎

![](https://raw.githubusercontent.com/jianzhichun/vscode-translate/master/img/translate_show.gif)

* 它会在用户设置中读取http.proxy以通过代理获取数据
* 您可以设置用户设置以改变语言和目标语言
* 至于translation.api只有谷歌和百度提供（默认是百度）
* translation.languageDetection = true表示在语言之前进行检测，以便我们可以在语言和目标语言之间翻译文档。 ,（默认为true）

![](https://raw.githubusercontent.com/jianzhichun/vscode-translate/master/img/config.png)

### 按住 CTRL+SHIFT+R 替换选择文本为翻译结果

![](https://raw.githubusercontent.com/jianzhichun/vscode-translate/master/img/replace_show.gif)

## 语言列表 (来源 google)

你可以看 [https://cloud.google.com/translate/docs/languages](https://cloud.google.com/translate/docs/languages)

| Language        | ISO-639-1 Code
| ------------- |:-------------: |
| Afrikaans | af |
| Albanian | sq |
| Amharic | am |
| Arabic | ar |
| Armenian | hy |
| Azeerbaijani | az |
| Basque | eu |
| Belarusian | be |
| Bengali | bn |
| Bosnian | bs |
| Bulgarian | bg |
| Catalan | ca |
| Cebuano | ceb (ISO-639-2) |
| Chichewa | ny |
| Chinese (Simplified) | zh-CN (BCP-47) |
| Chinese (Traditional) | zh-TW (BCP-47) |
| Corsican | co |
| Croatian | hr |
| Czech | cs |
| Danish | da |
| Dutch | nl |
| English | en |
| Esperanto | eo |
| Estonian | et |
| Filipino | tl |
| Finnish | fi |
| French | fr |
| Frisian | fy |
| Galician | gl |
| Georgian | ka |
| German | de |
| Greek | el |
| Gujarati | gu |
| Haitian Creole | ht |
| Hausa | ha |
| Hawaiian | haw (ISO-639-2) |
| Hebrew | iw |
| Hindi | hi |
| Hmong | hmn (ISO-639-2) |
| Hungarian | hu |
| Icelandic | is |
| Igbo | ig |
| Indonesian | id |
| Irish | ga |
| Italian | it |
| Japanese | ja |
| Javanese | jw |
| Kannada | kn |
| Kazakh | kk |
| Khmer | km |
| Korean | ko |
| Kurdish | ku |
| Kyrgyz | ky |
| Lao | lo |
| Latin | la |
| Latvian | lv |
| Lithuanian | lt |
| Luxembourgish | lb |
| Macedonian | mk |
| Malagasy | mg |
| Malay | ms |
| Malayalam | ml |
| Maltese | mt |
| Maori | mi |
| Marathi | mr |
| Mongolian | mn |
| Burmese | my |
| Nepali | ne |
| Norwegian | no |
| Pashto | ps |
| Persian | fa |
| Polish | pl |
| Portuguese | pt |
| Punjabi | ma |
| Romanian | ro |
| Russian | ru |
| Samoan | sm |
| Scots Gaelic | gd |
| Serbian | sr |
| Sesotho | st |
| Shona | sn |
| Sindhi | sd |
| Sinhala | si |
| Slovak | sk |
| Slovenian | sl |
| Somali | so |
| Spanish | es |
| Sundanese | su |
| Swahili | sw |
| Swedish | sv |
| Tajik | tg |
| Tamil | ta |
| Telugu | te |
| Thai | th |
| Turkish | tr |
| Ukrainian | uk |
| Urdu | ur |
| Uzbek | uz |
| Vietnamese | vi |
| Welsh | cy |
| Xhosa | xh |
| Yiddish | yi |
| Yoruba | yo |
| Zulu | zu |
