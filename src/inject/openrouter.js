const openrouter_get_api_key_ls = function () {
    const apiKey = localStorage.getItem('orApiKey');
    
    if (apiKey === null) {
        throw new Error('OpenRouter API key is null');
    }
    return apiKey;
}

const openrouter_check_api_key = async function (apiKey) {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error:", error);
    }
}

const openrouter_get_models = async function (apiKey) {
    try {
        const response = await fetch('https://openrouter.ai/api/v1/models', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error:", error);
    }
}

const openrouter_get_relevant_information = async function (ticker, messages= [], model = "", context = "") {
    const apiKey = openrouter_get_api_key_ls();
    let msg_context = "";
    let condition = "Respond only in English; the first response should be under 50 words."
    if(context.length == 0) {
        msg_context = "No context provided, only general information about company and tiker.";
    } else {
        msg_context = `Relevant contextual data provided by stock platform for ${ticker}: \n` + context;
    }
    if(model.length == 0) {
        throw new Error('OpenRouter model is empty');
    }
    const msg_to_send = [
        { "role": "system", "content": `You are a great assistant in financial markets, analysis and summarization. When you are asked about advice or an indication, you provide the user with useful information about the stock ticker input and a summary professional observation of the provided context, such as news or financial statistics of the company. You keep your analysis formal and business-related. Don't provide price predictions, but estimate sentiment based on the provided and known information about the company. ${condition}` },
        { "role": "user", "content": `What do you know about this stock ticker ${ticker}? \n ${msg_context}` },
        ...messages
    ];
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "X-Title": "uFinance: Yahoo Finance Upgraded", // Optional. Shows in rankings on openrouter.ai.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": msg_to_send
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};

const dispatch_models_to_website = async function(apiKey) {
    const response = await openrouter_get_models(apiKey);
    if(response) {
        document.dispatchEvent(new CustomEvent('orReceiveDataEvent', { detail: { orModels: response.data } }));
    } else {
        throw new Error('OpenRouter failed to list models');
    }
}

document.addEventListener('orSendDataEvent', async function (e) {
    const data = e.detail;
    if(data.apiKeyCheck === true) {
        const response = await openrouter_check_api_key(data.apiKey);
        if(response) {
            document.dispatchEvent(new CustomEvent('orReceiveDataEvent', { detail: { is_free_tier: response.data.is_free_tier } }));
            dispatch_models_to_website(data.apiKey);
        } else {
            document.dispatchEvent(new CustomEvent('orReceiveDataEvent', { detail: { invalidApiKey: true } }));
            throw new Error('OpenRouter API key is invalid');
        }   
    }
    if(data.getMessageFromAi === true){
        const response = await openrouter_get_relevant_information(data.ticker, data.messages, data.model, data.context);
        if(response) {
            document.dispatchEvent(new CustomEvent('orReceiveDataEvent', { detail: { orMessages: response.choices } }));
        } else {
            throw new Error('OpenRouter API key is invalid');
        }
    }
    //if(data.getOrModels === true){ }
  });