<div id="appe" class="ufinance advanced_details">
    <b-card id="link_list" :header="current_ticker">
    <template #header>
        <div class="header_one">
            <div class="header_two">More signals for {{ current_ticker }}</div>
            <div class="header_three">
                <i v-on:click="listHidden = !listHidden" class="fas fa-window-minimize header_icon"></i>
            </div>
        </div>
    </template>
        <div v-show="!listHidden" id="inject_links">
            <b-list-group v-for="l in links" :key="l.id">
                <b-list-group-item v-show="!statusShowLinks[l.id]" target="__blank" :href="l.url" class="mt-2"><img width="20px" :src="base_favicon + l.icon" class="mr-3" />{{ l.name }}</b-list-group-item>
                <b-button pill class="hideButton" @click="hideWebsite(l.id)" variant="danger">Hide</b-button>
            </b-list-group>
            <div class="signal_buttons">
                <b-button v-b-modal.modal-new_links class="new-links-btn" variant="primary">Add new links</b-button>
                <b-button @click="resetHiddenWebsites()" class="reset-hidden-btn" variant="primary">Reset hidden</b-button>
            </div>
        </div>

    </b-card>
    

    <b-card id="st_car" :header="current_ticker">

    <template #header>
        <div class="header_one">
            <div class="header_two">Stocktwits {{ current_ticker }}</div>
            <div class="header_three">
                <i v-on:click="twitsHidden = !twitsHidden" class="fas fa-window-minimize header_icon"></i>
            </div>
        </div>
    </template>
    <div class="inner-twits" v-show="!twitsHidden"><div id="stocktwits-widget-news"></div><a href='https://stocktwits.com' style='display:none; font-size: 0px;'>Open in Stocktwits</a></div>

    </b-card>

    <b-modal 
        @ok="onSubmitURL" 
        id="modal-new_links" 
        modal-class="ufinance" 
        title="Add new links to menu">

        <b-alert 
            variant="success" 
            :show="count_alert_append_url"
            dismissible
            @dismissed="count_alert_append_url=0"
            @dismiss-count-down="countDownChangedAppendUrl">
            <b-badge variant="info">{{ count_alert_append_url }}</b-badge> Added URL: {{ form_url.url }}  and  {{ form_url.ticker ? "append ticker" : "don't append ticker"}}
        </b-alert>

        <b-form @submit="onSubmitURL">
            <b-form-group
                id="input-group-name"
                label="Name of the link:"
                label-for="input-name">

            <b-form-input
                id="input-name"
                type="text"
                v-model="form_url.name"
                placeholder="Enter Name"
                required></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-url"
                label="Link to insert:"
                label-for="input-url">

            <b-form-input
                id="input-url"
                type="url"
                v-model="form_url.url"
                placeholder="Enter URL"
                required></b-form-input>
            </b-form-group>

            <p class="font-weight-light text-white-50"><small>Enter the URL witch you want to insert.</small></p>


            <b-form-checkbox 
                id="checkbox-ticker"
                class="mb-2 mr-sm-2 mb-sm-0"
                name="checkbox-ticker"
                value="true"
                unchecked-value="false"
                v-model="form_url.ticker">Append ticker</b-form-checkbox>

            <p class="font-weight-light text-white-50"><small>Append ticker at the end of the URL.</small></p>

        </b-form>
        <p class="font-weight-light font-italic text-white-50"><small>Please note the URL will also send anonymously to a database in order to integrate in the standard list of future updates.</small></p>
    </b-modal>

</div>


