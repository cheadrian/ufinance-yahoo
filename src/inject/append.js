let vue_app;
const vue_app_load = function (ticker) {
    vue_app = new Vue({
        el: "#ufinance_app",
        data: function () {
            return this.get_data(ticker);
        },
        methods: {
            get_data: function (ticker) {
                const base_path = document.querySelector('base_ext').getAttribute('url');
                return {
                    current_ticker: ticker,
                    last_ticker: "",
                    hiddenCards: {},
                    categoriesHidden: {},
                    tickerNote: "",
                    base_favicon: base_path + "src/favicons/",
                    base_icons: base_path + "src/icons/",
                    count_alert_append_url: 0,
                    statusShowLinks: {},
                    icons: {
                        hide_icon: "hide-eye.svg",
                    },
                    form_url: {
                        url: "",
                        ticker: "false",
                        name: "",
                    },
                    form_ai: {
                        api_key: "",
                        model: null,
                        model_options: [
                            { text: 'Select a model', value: null },
                            { text: 'To load all, enter API key', value: 'invalid' },
                            { text: 'OpenChat 3.5 (free)', value: 'openchat/openchat-7b:free' },
                        ],
                        send_context: true,
                        contextual_data: "",
                        settings_status: "",
                        load_message_status: false,
                        api_key_check: false,
                        modal_display: false,
                        output_message: [],
                        user_message: "",
                    },
                    links: [
                        { "id": 100, "type": "shortcut", "name": "Bloomberg", "category": "News", "icon": "bloomberg.png", "url": `https://www.bloomberg.com/` },
                        { "id": 101, "type": "shortcut", "name": "Reuters", "category": "News", "icon": "reuters.ico", "url": `https://www.reuters.com/` },
                        { "id": 102, "type": "shortcut", "name": "Financial Times", "category": "News", "icon": "ft.png", "url": `https://www.ft.com/` },
                        { "id": 114, "type": "shortcut", "name": "EW Calendar", "category": "News", "icon": "earnw.ico", "url": `https://www.earningswhispers.com/calendar` },
                        { "id": 122, "type": "search", "name": "Barrons", "category": "News", "icon": "barrons.ico", "url": `https://www.barrons.com/market-data/stocks/${ticker}` },
                        { "id": 123, "type": "search", "name": "Benzinga", "category": "News", "icon": "benzinga.png", "url": `https://www.benzinga.com/quote/${ticker}` },
                        { "id": 124, "type": "search", "name": "Motley Fool", "category": "News", "icon": "fool.webp", "url": `https://www.fool.com/quote/${ticker}` },
                        { "id": 126, "type": "search", "name": "Investing", "category": "News", "icon": "investing.ico", "url": `https://www.investing.com/search/?q=${ticker}` },
                        { "id": 127, "type": "search", "name": "InvestorPlace", "category": "News", "icon": "investorplace.webp", "url": `https://investorplace.com/stock-quotes/${ticker}-stock-quote/` },
                        { "id": 128, "type": "search", "name": "MarketWatch", "category": "News", "icon": "marketwatch.ico", "url": `https://www.marketwatch.com/investing/stock/${ticker}` },
                        { "id": 129, "type": "search", "name": "MorningStar", "category": "News", "icon": "morningstar.ico", "url": `https://www.morningstar.com/search?query=${ticker}` },
                        { "id": 132, "type": "search", "name": "TheStreet", "category": "News", "icon": "thestreet.png", "url": `https://www.thestreet.com/quote/${ticker}` },
                        { "id": 133, "type": "search", "name": "WSJ", "category": "News", "icon": "wsj.ico", "url": `https://www.wsj.com/market-data/quotes/${ticker}` },
                        { "id": 109, "type": "search", "name": "SEC", "category": "Regulatory", "icon": "sec.ico", "url": `https://www.sec.gov/edgar/search/#/q=${ticker}` },
                        { "id": 135, "type": "search", "name": "Reddit", "category": "Social Media", "icon": "reddit.png", "url": `https://www.reddit.com/search/?q=${ticker}` },
                        { "id": 104, "type": "search", "name": "WSB Search", "category": "Social Media", "icon": "reddit.png", "url": `https://www.reddit.com/r/wallstreetbets/search?q=${ticker}&restrict_sr=1` },
                        { "id": 108, "type": "search", "name": "X", "category": "Social Media", "icon": "x.svg", "url": `https://x.com/search?q=%24${ticker}` },
                        { "id": 116, "type": "search", "name": "StockTwits", "category": "Social Media", "icon": "stocktwist.png", "url": `https://stocktwits.com/symbol/${ticker}` },
                        { "id": 110, "type": "search", "name": "Google News", "category": "Search Engines", "icon": "google.ico", "url": `https://www.google.com/search?tbm=nws&q=${ticker}` },
                        { "id": 111, "type": "search", "name": "Google Search", "category": "Search Engines", "icon": "google.ico", "url": `https://www.google.com/search?&q=${ticker}` },
                        { "id": 112, "type": "search", "name": "Google Equity PDF", "category": "Search Engines", "icon": "google.ico", "url": `https://www.google.com/search?&q=${ticker}+equity+research+filetype%3Apdf` },
                        { "id": 103, "type": "shortcut", "name": "WSB Comment.Ai", "category": "Analysis Tools", "icon": "commentai.png", "url": `https://stocks.comment.ai/` },
                        { "id": 105, "type": "search", "name": "WSB SwaggyStocks", "category": "Analysis Tools", "icon": "swaggy.ico", "url": `https://swaggystocks.com/dashboard/wallstreetbets/ticker-sentiment/${ticker}` },
                        { "id": 106, "type": "search", "name": "Max-Pain", "category": "Analysis Tools", "icon": "maximum-pain.ico", "url": `http://maximum-pain.com/options/${ticker}` },
                        { "id": 107, "type": "search", "name": "TradingView", "category": "Analysis Tools", "icon": "tradingview.ico", "url": `https://www.tradingview.com/symbols/${ticker}` },
                        { "id": 113, "type": "search", "name": "Finviz", "category": "Analysis Tools", "icon": "finviz.png", "url": `https://finviz.com/quote.ashx?t=${ticker}` },
                        { "id": 115, "type": "search", "name": "EW Stats", "category": "Analysis Tools", "icon": "earnw.ico", "url": `https://www.earningswhispers.com/stocks/${ticker}` },
                        { "id": 117, "type": "search", "name": "ChartMill", "category": "Analysis Tools", "icon": "chartmill.png", "url": `https://www.chartmill.com/stock/quote/${ticker}` },
                        { "id": 118, "type": "search", "name": "YCharts", "category": "Analysis Tools", "icon": "ychart.ico", "url": `https://ycharts.com/companies/${ticker}` },
                        { "id": 119, "type": "search", "name": "MacroTrends", "category": "Analysis Tools", "icon": "macrotrends.ico", "url": `https://www.macrotrends.net/stocks/charts/${ticker}//stock-price-history` },
                        { "id": 120, "type": "search", "name": "BarChart", "category": "Analysis Tools", "icon": "barchart.ico", "url": `https://www.barchart.com/stocks/quotes/${ticker}` },
                        { "id": 121, "type": "search", "name": "Advfn", "category": "Analysis Tools", "icon": "advfn.ico", "url": `https://advfn.com/search/index?q=${ticker}` },
                        { "id": 125, "type": "search", "name": "GuruFocus", "category": "Analysis Tools", "icon": "gurufocus.ico", "url": `https://www.gurufocus.com/stock/${ticker}` },
                        { "id": 130, "type": "search", "name": "SeekingAlpha", "category": "Analysis Tools", "icon": "seekingalpha.svg", "url": `https://seekingalpha.com/symbol/${ticker}` },
                        { "id": 131, "type": "search", "name": "Stock Rover", "category": "Analysis Tools", "icon": "stockrover.ico", "url": `https://www.stockrover.com/research/insight/summary/quotes/${ticker}` },
                        { "id": 134, "type": "search", "name": "Zacks", "category": "Analysis Tools", "icon": "zacks.ico", "url": `https://www.zacks.com/stock/quote/${ticker}` },
                        { "id": 139, "type": "search", "name": "Decode Investing", "category": "Analysis Tools", "icon": "decode_inv.png", "url": `https://decodeinvesting.com/ticker/${ticker}` },
                        { "id": 141, "type": "search", "name": "Tradestie", "category": "Analysis Tools", "icon": "tradestie.png", "url": `https://tradestie.com/apps/stockmarket/${ticker}-analysis/` },
                        { "id": 142, "type": "search", "name": "StockAnalysis", "category": "Analysis Tools", "icon": "stockanalysis.webp", "url": `https://stockanalysis.com/stocks/${ticker}` },
                        { "id": 136, "type": "search", "name": "Copilot", "category": "A.I. LLMs", "icon": "copilot.ico", "url": `https://www.bing.com/search?showconv=1&sendquery=1&seltone=c&q=tell me about the stock with ticker: ${ticker}` },
                        { "id": 137, "type": "shortcut", "name": "ChatGPT", "category": "A.I. LLMs", "icon": "chatgpt.png", "url": `https://chat.openai.com/` },
                        { "id": 138, "type": "shortcut", "name": "Gemini", "category": "A.I. LLMs", "icon": "gemini.svg", "url": `https://bard.google.com/chat` },
                        { "id": 140, "type": "shortcut", "name": "Claude", "category": "A.I. LLMs", "icon": "claude.ico", "url": `https://claude.ai/` },
                    ]
                }
            },
            toggleCategoryHidden(category) {
                let ls_cat = category.toLowerCase().replace(/\s/g, '_');
                this.$set(this.categoriesHidden, ls_cat, !this.categoriesHidden[ls_cat]);
                localStorage.hiddenCategories = JSON.stringify(this.categoriesHidden);
            },
            isCategoryHidden(category) {
                let ls_cat = category.toLowerCase().replace(/\s/g, '_');
                return !this.categoriesHidden[ls_cat];
            },
            toggleCardHidden(cardName) {
                this.$set(this.hiddenCards, cardName, !this.hiddenCards[cardName]);
                localStorage.hiddenCards = JSON.stringify(this.hiddenCards);
            },
            getHiddenCategoriesFromLS() {
                return JSON.parse(localStorage.getItem('hiddenCategories')) || {};
            },
            getHiddenCardsFromLS() {
                return JSON.parse(localStorage.getItem('hiddenCards')) || {};
            },
            getTickerNoteFromLS(ticker) {
                return JSON.parse(localStorage.tickerNotes)[ticker] || "";
            },
            getOrApiKeyFromLS() {
                return localStorage.getItem('orApiKey');
            },
            getOrModelsOptionsFromLS() {
                return JSON.parse(localStorage.getItem('orModelsOptions')) || {};
            },
            getOrModelSelectFromLS() {
                return localStorage.getItem('orModel');

            },
            getOrSendContextFromLS() {
                return JSON.parse(localStorage.getItem('orSendContext'));
            },
            updateAiContext() {
                if (this.current_ticker) {
                    if (this.form_ai.send_context) {
                        if (this.last_ticker !== this.current_ticker) {
                            this.form_ai.contextual_data = get_contextual_data();
                            this.last_ticker = this.current_ticker;
                        }
                    } else {
                        this.form_ai.contextual_data = "";
                    }
                }
            },
            getOrModelName(modelValue) {
                const selectedOption = this.form_ai.model_options.find(option => option.value === modelValue);
                return selectedOption ? selectedOption.text : null;
            },
            updateAppData(ticker) {
                updatedData = this.get_data(ticker);
                this.$set(this, 'current_ticker', ticker);
                this.$set(this, 'tickerNote', this.getTickerNoteFromLS(ticker));
                this.$set(this, 'links', updatedData.links);
                if (this.current_ticker != this.last_ticker) {
                    this.$set(this.form_ai, 'output_message', []);
                }
            },
            appendUrlToList(name, link, attach_ticker = false) {
                this.appendWebsite(name, link, attach_ticker);
                //Show alert about appended URL and time to show alert
                this.count_alert_append_url = 5;
            },
            saveOrSettings(orApiKey, model, context) {
                if (model === "") {
                    model = "openchat/openchat-7b:free";
                }
                localStorage.setItem('orApiKey', orApiKey);
                localStorage.setItem('orModel', model);
                localStorage.setItem('orSendContext', context);
            },
            saveAiOutputToNotes() {
                if (this.tickerNote.length > 0) {
                    this.tickerNote += "\n";
                }
                let conversationString = this.form_ai.output_message.map(
                    item => `${capitalize_first_letter(item.message.role.trim())}:\n${item.message.content.trim()}\n`).join('\n');
                this.tickerNote += conversationString;
            },
            sendOrAssistantMessage() {
                this.form_ai.output_message.push(
                    {
                        message: {
                            role: 'user',
                            content: this.form_ai.user_message.trim(),
                        }
                    });
                this.form_ai.user_message = "";
                this.form_ai.load_message_status = true;
                const continued_conversation = this.form_ai.output_message.map(item => item.message);
                document.dispatchEvent(new CustomEvent('orSendDataEvent',
                    {
                        detail:
                        {
                            getMessageFromAi: true,
                            messages: continued_conversation,
                            ticker: this.current_ticker,
                            model: this.form_ai.model,
                            context: this.form_ai.contextual_data,
                        }
                    })
                );
            },
            countDownChangedAppendUrl(count_alert_append_url) {
                this.count_alert_append_url = count_alert_append_url;
            },
            getAddedWebsitesFromLS() {
                return JSON.parse(localStorage.getItem('addedLinks')) || [];
            },
            appendWebsite(name, url, use_ticker) {
                let ls_links = this.getAddedWebsitesFromLS();
                max_id = (ls_links.length == 0) ? 200 : Math.max(...ls_links.map(ls_links => ls_links.id));
                url.charAt(url.length - 1) !== "/" ? url = url.concat("/") : null;
                type = use_ticker ? "search" : "shortcut";
                category = "User added"
                let new_link_object = { "id": max_id + 1, "type": type, "name": name, "category": category, "icon": "default.png", "url": `${url}` };
                new_link_object.url = use_ticker ? `${url}${ticker}` : `${url}`;
                ls_links.push(new_link_object);
                this.links.push(new_link_object);
                localStorage.addedLinks = JSON.stringify(ls_links);
            },
            getHiddenWebsitesFromLS() {
                return JSON.parse(localStorage.getItem('hiddenLinks')) || [];
            },
            hideWebsite(id) {
                let ls_hidden = this.getHiddenWebsitesFromLS();
                ls_hidden.push(id);
                links = this.links;
                this.$set(this.statusShowLinks, id, true);
                localStorage.hiddenLinks = JSON.stringify(ls_hidden);
            },
            resetHiddenWebsites() {
                localStorage.hiddenLinks = JSON.stringify([]);
                this.statusShowLinks = {};
            },
            onSubmitURL(event) {
                const $urlForm = $('#input-url');
                $urlForm[0].reportValidity();
                event.preventDefault();
                if ($urlForm[0].checkValidity()) {
                    if (this.form_url.ticker == "true") {
                        this.form_url.ticker = true;
                    } else {
                        this.form_url.ticker = false;
                    }
                    this.appendUrlToList(this.form_url.name, this.form_url.url, this.form_url.ticker);
                }
            },
            onSubmitAISettings(event) {
                event.preventDefault();
                if (this.form_ai.api_key === "") {
                    this.form_ai.settings_status = "error_api_check";
                    return;
                }
                if (this.form_ai.model === null) {
                    this.form_ai.settings_status = "error_null_model";
                    return;
                }
                if (this.form_ai.api_key_check) {
                    this.form_ai.settings_status = "success";
                    this.saveOrSettings(this.form_ai.api_key, this.form_ai.model, this.form_ai.send_context);
                }
            },
            log(msg) {
                window.console.log(msg);
            }
        },
        computed: {
            console: () => console,
            linksByType() {
                is_comodity_index = check_commodity(this.current_ticker);
                if (is_comodity_index) {
                    return this.links.filter((link) => link.type === "shortcut");
                }
                return this.links;
            },
            categories() {
                // Get unique categories and sort them
                const uniqueCategories = [...new Set(this.linksByType.map((link) => link.category))];
                const sortedCategories = uniqueCategories.sort((a, b) => {
                    if (a === "User added") {
                        return -1;
                    } else {
                        return a.localeCompare(b);
                    }
                });
                return sortedCategories;
            },
            groupedLinks() {
                // Group links by category
                const grouped = {};
                this.categories.forEach((category) => {
                    if (category === 'undefined') {
                        category = 'User';
                    }
                    grouped[category] = this.linksByType.filter((link) => link.category === category);
                });
                return grouped;
            },
        },
        mounted() {
            this.links = this.links.concat(this.getAddedWebsitesFromLS());
            if (localStorage.hiddenLinks) {
                links = this.links;
                this.getHiddenWebsitesFromLS().map(l => {
                    this.$set(this.statusShowLinks, l, true);
                });
            }
            if (localStorage.hiddenCards) {
                this.hiddenCards = this.getHiddenCardsFromLS();
            }
            if (localStorage.hiddenCategories) {
                this.categoriesHidden = this.getHiddenCategoriesFromLS();
            }
            if (localStorage.tickerNotes) {
                this.tickerNote = this.getTickerNoteFromLS(this.current_ticker);
            }
            if (localStorage.orApiKey) {
                this.form_ai.api_key = this.getOrApiKeyFromLS();
                this.form_ai.api_key_check = true;
            }
            if (localStorage.orModelsOptions) {
                this.form_ai.model_options = this.getOrModelsOptionsFromLS();
            }
            if (localStorage.orModel) {
                this.form_ai.model = this.getOrModelSelectFromLS();
            }
            if (localStorage.orSendContext) {
                this.form_ai.send_context = this.getOrSendContextFromLS();
            }
        },
        watch: {
            listHidden(listHidden) {
                localStorage.listHidden = listHidden;
            },
            twitsHidden(twitsHidden) {
                localStorage.twitsHidden = twitsHidden;
            },
            tickerNote(tickerNote) {
                const tickerNotes = JSON.parse(localStorage.getItem('tickerNotes')) || {};
                tickerNotes[this.current_ticker] = tickerNote;
                localStorage.setItem('tickerNotes', JSON.stringify(tickerNotes));
            },
            'form_ai.api_key': function (newVal, oldVar) {
                if (newVal.length > 6) {
                    if (newVal !== this.getOrApiKeyFromLS()) {
                        this.form_ai.settings_status = 'checking';
                        document.dispatchEvent(new CustomEvent('orSendDataEvent', { detail: { apiKeyCheck: true, apiKey: newVal } }));
                    }
                } else {
                    this.form_ai.settings_status = 'error_api_check';
                }
            },
            'form_ai.modal_display': function (newVal, oldVar) {
                if (newVal && this.form_ai.output_message.length == 0) {
                    this.form_ai.load_message_status = true;
                    this.updateAiContext();
                    document.dispatchEvent(new CustomEvent('orSendDataEvent',
                        {
                            detail:
                            {
                                getMessageFromAi: true,
                                ticker: this.current_ticker,
                                model: this.form_ai.model,
                                context: this.form_ai.contextual_data,
                            }
                        }
                    ));
                }
            }
        }
    })
}

const capitalize_first_letter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const get_ticker = function () {
    const regexTicker = /(?<=\/quote\/)(.[\^\=A-Z]+)/g;
    decodedPath = decodeURIComponent(window.location.pathname);
    const detectedTickers = regexTicker.exec(decodedPath);
    if (detectedTickers) {
        return detectedTickers[0];
    }
    else {
        return null;
    }
}

const get_contextual_data = function () {
    let context_data = "";
    try {
        const svelt_news_headlines = document.querySelector('*[data-testid="recent-news"]').textContent.trim();
        const svelt_quote_stats = document.querySelector('*[data-testid="quote-statistics"]').textContent.trim();
        const svelt_current_price = "Current price:" + document.querySelector('*[data-testid="qsp-price"]').textContent.trim();
        const svelt_valuation_measure = document.querySelector('*[data-testid="valuation-measures"]').textContent.trim();
        const svelt_financial_highlights = document.querySelector('*[data-testid="financial-highlights"]').textContent.trim();
        context_data = svelt_news_headlines + "\n" + svelt_quote_stats + "\n" + svelt_current_price + "\n" + svelt_valuation_measure + "\n" + svelt_financial_highlights;
    } catch (error) {
        console.log("Failed to detect contextual data:", error.message);
    }

    return context_data;
}

const check_commodity = function (current_ticker) {
    const regexFilterComodities = /-|\^|\=|\./g;
    const r_chk_res = regexFilterComodities.exec(current_ticker);
    is_comodity_index = false;

    if (r_chk_res && r_chk_res.length > 0) {
        is_comodity_index = true;
    }

    return is_comodity_index;
}

const hide_all_app = function () {
    $("#stock_notes").hide();
    $("#ufinance_app").hide();
}

const show_all_app = function () {
    $("#stock_notes").show();
    $("#ufinance_app").show();
}

const update_functions = function () {
    const current_ticker = get_ticker();

    if (current_ticker) {
        vue_app.updateAppData(current_ticker);
        show_all_app();
    } else {
        hide_all_app();
    }
}

const append_functions = function () {
    const current_ticker = get_ticker();

    if (current_ticker) {
        base_url = $("base_ext").attr("url");
        ext_id = $("base_ext").attr("ext_id");
        $.get(base_url + 'src/inject/append.vue', function (data) {
            if ($("#render-target-default").length) {
                $("#render-target-default").append(data);
            }
            else if ($("body#atomic").length) {
                $("body#atomic").append(data);
                const top_ad_height = $("#svelte .ad .tw-sticky.tw-top-0").height();
                const under_header_offset = top_ad_height + 130;
                $("#ufinance_app").css('top', under_header_offset);
            }
            vue_app_load(current_ticker);
            if ($("#render-target-default").length) {
                // ...
            }
        });
    }
}

window.addEventListener('load', function () {
    history.pushState = (f => function pushState() {
        const ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        return ret;
    })(history.pushState)

    $(window).on('pushstate popstate', function () {
        if ($("#ufinance_app").length) {
            update_functions();
        } else {
            append_functions();
        }
    });
    append_functions();
    // Hide uFinance App on click
    $(document).on("click", "#show-hide-ufinance", function () {
        if ($("#ufinance_app").hasClass("slide-right-animate")) {
            $("#ufinance_app").animate({ width: "250" }, 200, function () {
                $("#ufinance_app").removeClass("slide-right-animate");
                $("#ufinance_app").css("width", "");
                localStorage.setItem("ufinanceAppHidden", "false");
            });
        } else {
            $("#ufinance_app").addClass("slide-right-animate");
            $("#ufinance_app").animate({ width: "0" }, 200);
            localStorage.setItem("ufinanceAppHidden", "true");
        }
    })
    // Hide uFinance App on load
    $(document).ready(function () {
        if (localStorage.getItem("ufinanceAppHidden") == "true") {
            setTimeout(function () {
                $("#ufinance_app").addClass("slide-right-animate");
                $("#ufinance_app").animate({ width: "0" }, 200);
            }, 3000);
        }
    })
});

document.addEventListener('orReceiveDataEvent', function (e) {
    var data = e.detail;
    if (data.invalidApiKey === true) {
        vue_app.form_ai.settings_status = 'error_api_check';
        vue_app.form_ai.api_key_check = false;
    }
    if (typeof data.is_free_tier === 'boolean') {
        vue_app.form_ai.settings_status = 'success_api_check';
        vue_app.form_ai.api_key_check = true;
        //document.dispatchEvent(new CustomEvent('orSendDataEvent', { detail: { getOrModels: true } }));
    }
    if (data.orModels) {
        vue_app.form_ai.model_options = data.orModels.map(model => ({
            text: model.name,
            value: model.id,
        }));
        localStorage.orModelsOptions = JSON.stringify(vue_app.form_ai.model_options);
    }
    if (data.orMessages) {
        vue_app.form_ai.output_message.push(...data.orMessages);
        vue_app.form_ai.load_message_status = false;
    }
});