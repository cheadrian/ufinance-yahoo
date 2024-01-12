let vue_app;
var after_append = function (ticker, s_name) {
    vue_app = new Vue({
        el: "#appe",
        data: function () {
            base_favicon = $("base_ext").attr("url") + "src/favicons/";
            return this.get_data(ticker, s_name, base_favicon);
        },
        methods: {
            get_data: function (ticker, s_name , base_favicon) {
                return {
                    listHidden: false,
                    twitsHidden: false,
                    current_ticker: s_name,
                    base_favicon: base_favicon,
                    count_alert_append_url: 0,
                    statusShowLinks: {},
                    form_url: {
                        url: "",
                        ticker: "false",
                        name: "",
                    },
                    links: [
                        { "id": 100, "category":"general",  "name": "Bloomberg",         "icon": "bloomberg.png",        "url": `https://www.bloomberg.com/` },
                        { "id": 101, "category":"general",  "name": "Reuters",           "icon": "reuters.ico",          "url": `https://www.reuters.com/` },
                        { "id": 102, "category":"general",  "name": "FT",                "icon": "ft.png",               "url": `https://www.ft.com/` },
                        { "id": 103, "category":"general",  "name": "WSB Comment.Ai",    "icon": "commentai.png",        "url": `https://stocks.comment.ai/` },
                        { "id": 104, "category":"search",   "name": "WSB Search",        "icon": "reddit.png",           "url": `https://www.reddit.com/r/wallstreetbets/search?q=${ticker}&restrict_sr=1` },
                        { "id": 105, "category":"search",   "name": "WSB SwaggyStocks",  "icon": "swaggy.ico",           "url": `https://swaggystocks.com/dashboard/wallstreetbets/ticker-sentiment/${ticker}` },
                        { "id": 106, "category":"search",   "name": "Max-Pain",          "icon": "maximum-pain.ico",     "url": `http://maximum-pain.com/options/${ticker}` },
                        { "id": 107, "category":"search",   "name": "TradingView",       "icon": "tradingview.ico",      "url": `https://www.tradingview.com/symbols/${ticker}` },
                        { "id": 108, "category":"search",   "name": "Twitter",           "icon": "twitter.ico",          "url": `https://twitter.com/search?q=%24${ticker}` },
                        { "id": 109, "category":"search",   "name": "SEC",               "icon": "sec.ico",              "url": `https://www.sec.gov/cgi-bin/browse-edgar?CIK=${ticker}` },
                        { "id": 110, "category":"search",   "name": "Google News",       "icon": "google.ico",           "url": `https://www.google.com/search?tbm=nws&q=${ticker}` },
                        { "id": 111, "category":"search",   "name": "Google Search",     "icon": "google.ico",           "url": `https://www.google.com/search?&q=${ticker}` },
                        { "id": 112, "category":"search",   "name": "Google Equity PDF", "icon": "google.ico",           "url": `https://www.google.com/search?&q=${ticker}+equity+research+filetype%3Apdf`},
                        { "id": 113, "category":"search",   "name": "Finviz",            "icon": "finviz.png",           "url": `https://finviz.com/quote.ashx?t=${ticker}` },
                        { "id": 114, "category":"general",  "name": "EW Calendar",       "icon": "earnw.ico",            "url": `https://www.earningswhispers.com/calendar` },
                        { "id": 115, "category":"search",   "name": "EW Sentiment",      "icon": "earnw.ico",            "url": `https://www.earningswhispers.com/sentiment/${ticker}` },
                        { "id": 116, "category":"search",   "name": "StockTwits",        "icon": "stocktwist.png",       "url": `https://stocktwits.com/symbol/${ticker}` },
                        { "id": 117, "category":"search",   "name": "ChartMill",         "icon": "chartmill.png",        "url": `https://www.chartmill.com/stock/quote/${ticker}` },
                        { "id": 118, "category":"search",   "name": "YCharts",           "icon": "ychart.ico",           "url": `https://ycharts.com/companies/${ticker}` },
                        { "id": 119, "category":"search",   "name": "MacroTrends",       "icon": "macrotrends.ico",      "url": `https://www.macrotrends.net/stocks/charts/${ticker}//stock-price-history` },
                        { "id": 120, "category":"search",   "name": "BarChart",          "icon": "barchart.ico",         "url": `https://www.barchart.com/stocks/quotes/${ticker}` },
                        { "id": 121, "category":"search",   "name": "Advfn",             "icon": "advfn.ico",      "url": `https://advfn.com/search/index?q=${ticker}` }, 
                        { "id": 122, "category":"search",   "name": "Barrons",           "icon": "barrons.ico",      "url": `https://www.barrons.com/market-data/stocks/${ticker}` },
                        { "id": 123, "category":"search",   "name": "Benzinga",          "icon": "benzinga.png",      "url": `https://www.benzinga.com/quote/${ticker}` },
                        { "id": 124, "category":"search",   "name": "Motley Fool",       "icon": "fool.webp",      "url": `https://www.fool.com/quote/${ticker}` },
                        { "id": 125, "category":"search",   "name": "Gurufocus",         "icon": "gurufocus.ico",      "url": `https://www.gurufocus.com/stock/${ticker}` },
                        { "id": 126, "category":"search",   "name": "Investing",         "icon": "investing.ico",      "url": `https://www.investing.com/search/?q=${ticker}` },
                        { "id": 127, "category":"search",   "name": "InvestorPlace",     "icon": "investorplace.webp",      "url": `https://investorplace.com/stock-quotes/${ticker}-stock-quote/` },
                        { "id": 128, "category":"search",   "name": "MarketWatch",       "icon": "marketwatch.ico",      "url": `https://www.marketwatch.com/investing/stock/${ticker}` },
                        { "id": 129, "category":"search",   "name": "MorningStar",       "icon": "morningstar.ico",      "url": `https://www.morningstar.com/search?query=${ticker}` },
                        { "id": 130, "category":"search",   "name": "SeekingAlpha",      "icon": "seekingalpha.svg",      "url": `https://seekingalpha.com/symbol/${ticker}` },
                        { "id": 131, "category":"search",   "name": "StockRover",        "icon": "stockrover.ico",      "url": `https://www.stockrover.com/research/insight/summary/quotes/${ticker}` },
                        { "id": 132, "category":"search",   "name": "TheStreet",         "icon": "thestreet.png",      "url": `https://www.thestreet.com/quote/${ticker}` },
                        { "id": 133, "category":"search",   "name": "WSJ",               "icon": "wsj.ico",      "url": `https://www.wsj.com/market-data/quotes/${ticker}` },
                        { "id": 134, "category":"search",   "name": "Zacks",             "icon": "zacks.ico",      "url": `https://www.zacks.com/stock/quote/${ticker}` },
                        //{ "id": 104, "category":"search",  "name": "SEC Fail Delivery", "icon": "sec.ico", "url": `https://sec.report/fails.php?tc=${ticker}` },
                    ]
                }
            },
            updateUrlList: function (ticker) {
                new_data = this.get_data(ticker);
                this.current_ticker = ticker;
                this.links = new_data.links;
            },
            appendUrlToList(name, link, attach_ticker=false){
                add_database_url(name, link, attach_ticker);
                this.appendWebsite(name, link, attach_ticker);
                //Show alert about appended URL and time to show alert
                this.count_alert_append_url = 5;
            },
            countDownChangedAppendUrl(count_alert_append_url) {
                this.count_alert_append_url = count_alert_append_url;
            },
            getAddedWebsitesFromLS(){
                return JSON.parse(localStorage.getItem('added_links')) || [];
            },
            appendWebsite(name, url, use_ticker){
                let ls_links = this.getAddedWebsitesFromLS();
                max_id = (ls_links.length == 0)?200:Math.max(...ls_links.map(ls_links => ls_links.id));
                url.charAt(url.length - 1) !== "/"?url = url.concat("/"):null;
                category = use_ticker?"search":"general";
                let new_link_object = {"id": max_id + 1, "category": category, "name":name, "icon": "default.png", "url": `${url}`};
                new_link_object.url = use_ticker?`${url}${ticker}`:`${url}`;
                ls_links.push(new_link_object);
                this.links.push(new_link_object);
                //console.log(ls_links);
                localStorage.added_links = JSON.stringify(ls_links);
            },
            getHiddenWebsitesFromLS(){
                return JSON.parse(localStorage.getItem('hidden_links')) || [];
            },
            hideWebsite(id){
                let ls_hidden = this.getHiddenWebsitesFromLS();
                ls_hidden.push(id);
                links = this.links;
                this.$set(this.statusShowLinks, id, true);
                localStorage.hidden_links = JSON.stringify(ls_hidden);
            },
            resetHiddenWebsites(){
                localStorage.hidden_links = JSON.stringify([]);
                this.statusShowLinks = {};
            },
            onSubmitURL(event) {
                var $urlForm = $('#input-url'); 
                $urlForm[0].reportValidity();
                event.preventDefault();
                if($urlForm[0].checkValidity()){
                    if(this.form_url.ticker == "true"){
                        this.form_url.ticker = true;
                    } else{
                        this.form_url.ticker = false;
                    }
                    this.appendUrlToList(this.form_url.name, this.form_url.url, this.form_url.ticker);
                }
            },
        },
        mounted(){
            if (localStorage.listHidden) {
                this.listHidden = localStorage.listHidden=='true' ? true:false;
            }
            if (localStorage.twitsHidden) {
                this.twitsHidden = localStorage.twitsHidden=='true' ? true:false;
            }
            this.links = this.links.concat(this.getAddedWebsitesFromLS());
            if(localStorage.hidden_links){
                links = this.links;
                this.getHiddenWebsitesFromLS().map(l => {
                    //console.log(l);
                    this.$set(this.statusShowLinks, l, true);
                });
            }
        },
        watch: {
            listHidden(listHidden) {
                localStorage.listHidden = listHidden;
            },
            twitsHidden(twitsHidden) {
                localStorage.twitsHidden = twitsHidden;
            },
        }
    })
}

var insert_stocktwits = function (ticker) {
    $('#stocktwits-widget-news').empty();
    var pluginConfig = {
        container: 'stocktwits-widget-news',
        symbol: ticker,
        width: '297',
        height: '600',
        limit: '70',
        scrollbars: 'true',
        streaming: 'true',
        avatars: 0,
        title: current_ticker + ' Ideas',
        style: {
            link_color: '#4f8ce8',
            link_hover_color: '#4f8ce8',
            header_text_color: 'white',
            border_color: 'black',
            divider_color: '#929292',
            divider_color: '#929292',
            divider_type: 'solid',
            box_color: '#212529',
            stream_color: '#212529',
            text_color: 'white',
            time_color: '999999',
            username_color: '#4f8ce8',
        }
    }
    STWT.Widget(pluginConfig);
}

var fetch_web = function (ext_id, url, append_to, append_from) {
    chrome.runtime.sendMessage(ext_id,
        {
            url: url,
        },
        function (response) {
            content = $(append_from, response)
            $(append_to).append(content);
        }
    );
}


var get_ticker = function () {
    var regexTicker = /(?<=quote\/)(.*[A-Z])(?=\?)/g; ///(?<=quote\/)(.*[A-Z])((?=\/)|(?=\?))/g;
    var detectedTickers = regexTicker.exec(window.location.href);
    if (detectedTickers) {
        current_ticker = detectedTickers[0];
        return current_ticker;
    }
    else {
        return null;
    }
}

//TODO: Update after pushstate, popstate, because it takes the old name
var get_stock_name = function () {
    var stock_title = $("#quote-header-info .D\\(ib\\).Fz\\(18px\\)").text();//document.querySelector('title').text;
    return stock_title;
    /*
    var regexStName = /(?<=\: )(.*)(?=\ -)/g; ///(?<=quote\/)(.*[A-Z])((?=\/)|(?=\?))/g;
    regexStName.lastIndex = 0;
    var detectedName = regexStName.exec(stock_title);
    return stock_title;
    if (detectedName) {
        current_name = detectedName[0];
        if(regexFilterComodities.exec(current_name).length <= 0){
            return current_name;
        }
        else{
            return null;
        }
    }
    else {
        return null;
    }*/
}

var check_commodity = function(current_ticker){
    var regexFilterComodities = /-|\%5E|\%3D|\./g;
    var r_chk_res = regexFilterComodities.exec(current_ticker)
    is_comodity_index = false;

    if(r_chk_res && r_chk_res.length > 0){
        is_comodity_index = true;
    }

    return is_comodity_index;
}

var hide_all_app = function () {
    $("#stocktwits-widget-news").hide();
    $("#appe").hide();
}

var show_all_app = function () {
    $("#stocktwits-widget-news").show();
    $("#appe").show();
}

var update_functions = function () {
    //console.log("UFINANCE: update function");
    current_ticker = get_ticker();
    current_stock_name = get_stock_name();
    is_comodity_index = check_commodity(current_ticker);

    if (current_ticker && !is_comodity_index) {
        //after_append(current_ticker);
        insert_stocktwits(current_ticker);
        //TODO: vue_app.updateUrlList(current_ticker, current_stock_name);
        vue_app.updateUrlList(current_ticker);

        show_all_app();
    } else { //hide if isn't to a page where regex match
        hide_all_app();
    }
}

var append_functions = function () {
    //console.log("UFINANCE: append function");
    current_ticker = get_ticker();
    current_stock_name = get_stock_name();
    is_comodity_index = check_commodity(current_ticker);
    
    if (current_ticker && !is_comodity_index) {
        base_url = $("base_ext").attr("url")
        ext_id = $("base_ext").attr("ext_id")
        $.get(base_url + 'src/inject/append.vue', function (data) {
            $("#YDC-Col2").prepend(data);
            after_append(current_ticker, current_stock_name);
            insert_stocktwits(current_ticker);
        });
    }
}

window.addEventListener('load', function() {
    history.pushState = (f => function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        return ret;
    })(history.pushState)

    $(window).on('pushstate popstate', function () {
        if ($("#appe").length) {
            update_functions();
        } else {
            append_functions();
        }
    });

    append_functions();
});