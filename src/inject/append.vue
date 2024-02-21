<div id="ufinance_app" class="ufinance advanced_details">

    <b-card id="stock_notes" :header="current_ticker">
        <template #header>
            <div class="header_one">
                <div class="header_two">Notes for {{ current_ticker }}</div>
                <div class="header_three">
                    <i v-on:click="toggleCardHidden('notes')" class="fas fa-window-minimize header_icon"></i>
                </div>
            </div>
        </template>
        <b-form-textarea
            id="textarea-ticker-note"
            v-model="tickerNote"
            v-show="!hiddenCards['notes']"
            placeholder="Enter your notes about this ticker..."
            size="sm"
            debounce="500"
            rows="3"
            max-rows="16"
            class="ticker-note-textarea">
            </b-form-textarea>
    </b-card>

    <b-card id="ask_for_review" class="mb-2" v-show="!hiddenCards['ask_for_review']">
        <template #header>
            <div class="header_one">
                <div class="header_two">Review uFinance</div>
                <div class="header_three">
                    <i v-on:click="toggleCardHidden('ask_for_review')" class="fas fa-times close_header_icon"></i>
                </div>
            </div>
        </template>
        <div class="p-2 text-center mt-2">
            <b-card-text>
                Thank you for using uFinance. <br/> If it bring value in your life, then please consider reviewing extension on the Chrome web store.
            </b-card-text>
            <div class="d-flex justify-content-center">
                <b-button class="review-us-btn" target="_blank" href="https://chromewebstore.google.com/detail/ufinance/fmckmialbjidoghednjgbmigapfildng/reviews/my-review" variant="warning">⭐ Give 5 stars</b-button>
            </div>
        </div>
    </b-card>

    <b-card id="ask_ai_or" :header="current_ticker">
        <template #header>
            <div class="header_one">
                <div class="header_two">A.I. for {{ current_ticker }}</div>
                <div class="header_three">
                    <i v-on:click="toggleCardHidden('ask_ai_or')" class="fas fa-window-minimize header_icon"></i>
                </div>
            </div>
        </template>
        <div v-show="!hiddenCards['ask_ai_or']" class="or-ai-buttons">
            <b-button v-b-modal.modal-or-ask-ai class="or-main-modal-btn" variant="primary">Ask A.I.</b-button>
            <b-button v-b-modal.modal-or-ai-settings class="or-settings-btn" variant="primary"><i class="fas fa-wrench"></i></b-button>
        </div>
    </b-card>

    <b-card id="link_list" :header="current_ticker">
        <template #header>
            <div class="header_one">
                <div class="header_two">More signals for {{ current_ticker }}</div>
                <div class="header_three">
                    <i v-on:click="toggleCardHidden('url_list')" class="fas fa-window-minimize header_icon"></i>
                </div>
            </div>
        </template>
        <div v-show="!hiddenCards['url_list']" id="inject_links">
            <div v-for="category in categories" :key="category" class="links-category">
                <div class="list-category-header d-flex justify-content-between align-items-center px-2 py-1 mt-1">
                    <div class="list-category-title">{{ category }}</div> 
                    <div class="list-category-button">
                        <i v-on:click="toggleCategoryHidden(category)" class="fas fa-window-minimize list-category-icon"></i>
                    </div>
                </div>
                <b-list-group 
                    v-for="l in groupedLinks[category]" 
                    :key="l.id"  
                    v-show="isCategoryHidden(category)">
                        <b-list-group-item 
                            v-show="!statusShowLinks[l.id]" 
                            target="__blank" 
                            :href="l.url" 
                            class="mt-1">
                                <img width="20px" 
                                    :src="base_favicon + l.icon" 
                                    class="d-inline-block mr-1" />
                                <span class="align-middle">{{ l.name }}</span>
                        </b-list-group-item>
                        <b-button v-show="!statusShowLinks[l.id]" pill class="hideButton" @click="hideWebsite(l.id)" variant="danger"><i class="far fa-eye-slash"></i></b-button>
                </b-list-group>
            </div>
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
                    <i v-on:click="toggleCardHidden('twits')" class="fas fa-window-minimize header_icon"></i>
                </div>
            </div>
        </template>
        <div v-show="!hiddenCards['twits']" class="inner-twits">
            <div id="stocktwits-widget-news"></div>
            <a href='https://stocktwits.com' style='display:none; font-size: 0px;'>Open in Stocktwits</a>
        </div>
    </b-card>

    <a href="https://chromewebstore.google.com/detail/ufinance/fmckmialbjidoghednjgbmigapfildng/reviews/my-review">
        <p target="__blank" class="font-weight-light text-white-50 text-center"><small>⭐ Give uFinance stars!</small></p>
    </a>

    
    <b-modal 
        @ok="onSubmitURL" 
        id="modal-new_links" 
        modal-class="ufinance" 
        title="Add new links to menu">

        <b-alert 
            variant="success" 
            :show="count_alert_append_url"
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

    <b-modal 
        id="modal-or-ask-ai" 
        modal-class="ufinance" 
        title="A.I. assistant"
        v-model="form_ai.modal_display"
        hide-footer>

        <b-alert 
            variant="danger" 
            :show="form_ai.api_key.length === 0">
            No valid API key is set.
        </b-alert>

        <div v-if="form_ai.api_key.length > 0">
            <b-card 
                class="justify-content-center text-center"
                v-show="form_ai.load_message_status">
                <b-spinner 
                    type="grow" 
                    variant="primary"
                    class="mb-2"></b-spinner>
                <p class="font-weight-light text-white-50">Getting the response from the model {{ getOrModelName(form_ai.model) }} ...</p>
            </b-card>

            <div class="overflow-auto" style="max-height:60vh;">
                <b-list-group v-if="form_ai.output_message.length > 0">
                    <b-list-group-item v-for="(m, index) in form_ai.output_message" :key="index">
                        <div v-if="m.message.role === 'user'">
                            <strong>User:</strong><br>
                        </div>
                        <div v-else-if="m.message.role === 'assistant'">
                            <strong>Assistant:</strong><br>
                        </div>
                        {{ m.message.content }}
                    </b-list-group-item>
                </b-list-group>
            </div>

            <b-form @submit.prevent="sendOrAssistantMessage" class="mt-2">
                <b-form-group label="Type your message:" label-for="messageInput">
                    <b-input
                        id="messageInput"
                        v-model="form_ai.user_message"
                        placeholder="Type here..."
                    ></b-input>
                </b-form-group>
            </b-form>
            <p class="font-weight-light text-white-50"><small>Conversation is not saved. Contextual data is parsed only on the summary page. <br/>
            The quality of the data generated by LLMs is limited; do not use it for financial or investment advice.</small></p>
        </div>
        

        <div>
            <b-button @click="saveAiOutputToNotes()" class="" variant="primary">Save to notes</b-button>
            <b-button v-b-toggle.collapse-1 variant="primary">Context data</b-button>
        </div>

        <b-collapse id="collapse-1" class="mt-2">
          <b-card class="overflow-auto" style="max-height:10vh;">
            <p class="card-text">Using model: {{ getOrModelName(form_ai.model) }}</p>
            <p class="card-text">Add contextual data: {{ form_ai.send_context }}</p>
            <p class="card-text">Contextual data: </p>
            <p class="card-text">{{ form_ai.contextual_data }}</p>
          </b-card>
        </b-collapse>
    </b-modal>

    <b-modal 
        @ok="onSubmitAISettings" 
        id="modal-or-ai-settings" 
        modal-class="ufinance" 
        title="A.I. assistant configuration">

        <p class="font-weight-light text-white-50">OpenRouter is a unified interface for LLMs, so you can chose what model you want to use. They have many <a href="https://openrouter.ai/docs#models" target="__blank">free models</a>.</p>

        <b-alert 
            variant="success" 
            :show="form_ai.settings_status === 'success'">
            Succesfully saved API key and model settings.
        </b-alert>

        <b-alert 
            variant="secondary" 
            :show="form_ai.settings_status === 'success_api_check'">
            Succesfully validating API key.
        </b-alert>

        <b-alert 
            variant="danger" 
            :show="form_ai.settings_status === 'error_null_model'">
            Model can't be empty.
        </b-alert>

        <b-alert 
            variant="danger" 
            :show="form_ai.settings_status === 'error_api_check'">
            Error while checking the API key.
        </b-alert>

        <b-form @submit="onSubmitAISettings">
            <b-form-group
                id="input-group-api-key"
                label="OpenRouter API key:"
                label-for="input-or-api-key">
                <b-form-input
                    id="input-or-api-key"
                    type="text"
                    debounce="1000"
                    v-model="form_ai.api_key"
                    placeholder="Enter OpenRouter API key"
                    required></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-center">
            <b-spinner 
                type="grow" 
                variant="primary"
                class="mb-2"
                v-show="form_ai.settings_status === 'checking'"></b-spinner>
            </div>

            <p class="font-weight-light text-white-50">You can get the API key from: <a href="https://openrouter.ai/keys" target="__blank">https://openrouter.ai/keys</a></p>

            <b-form-group
                id="input-group-ai-model"
                label="LLM model to use:"
                label-for="input-ai-model">
                <b-form-select
                    id="input-ai-model"
                    v-model="form_ai.model"
                    :options="form_ai.model_options"
                    required></b-form-select>
                </b-form-group>

            <p class="font-weight-light text-white-50">Models marked with (free) have no charge. To use other models, you should top up your OpenRouter account.</p>

            <b-form-checkbox 
                id="checkbox-or-context"
                class="mb-2 mr-sm-2 mb-sm-0"
                name="checkbox-or-context"
                value="true"
                unchecked-value="false"
                v-model="form_ai.send_context">Send context</b-form-checkbox>

                <p class="font-weight-light text-white-50"><small>This will send to the A.I. information like the news headlines and descriptions, financial data and the price scraped from the current page, otherwise it will only send the ticker.</small></p>

        </b-form>

        <p class="font-weight-light font-italic text-white-50"><small>The key is saved locally, on your browser, and will be used only for your queries.</small></p>
    </b-modal>
</div>

<div id="show-hide-ufinance">U!</div>
