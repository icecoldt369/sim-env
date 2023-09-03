import streamlit as st
import replicate
import os
import sys

# App title
st.set_page_config(page_title="🦙💬 Prompt Chatbot")

# Replicate Credentials
with st.sidebar:
    st.title('🦙💬 Prompt LLaMA 2')
    st.write('by Tevy Kuch')

    # authemticate API token
    secrets_path = "/Users/tevykuch/V2-Langchain/.streamlit/secrets.toml"
    print("Secrets path:", secrets_path)

    if os.path.isfile(secrets_path) and 'REPLICATE_API_TOKEN' in st.secrets:
        st.success('API key already provided!', icon='✅')
        replicate_api = st.secrets['REPLICATE_API_TOKEN']
    else:
        replicate_api = st.text_input(
            'Enter Replicate API token:', type='password')
        if not (replicate_api.startswith('r8_') and len(replicate_api) == 40):
            st.warning('Please enter your credentials!', icon='⚠️')
        else:
            st.success('Proceed to entering your prompt message!', icon='👉')

    # Refactored from https://github.com/a16z-infra/llama2-chatbot
    st.subheader('Models and parameters')
    selected_model = st.sidebar.selectbox('Choose a Llama2 model', [
                                          'Llama2-7B', 'Llama2-13B', 'Llama2-70B'], key='selected_model')
    if selected_model == 'Llama2-7B':
        llm = 'a16z-infra/llama7b-v2-chat:4f0a4744c7295c024a1de15e1a63c880d3da035fa1f49bfd344fe076074c8eea'
    elif selected_model == 'Llama2-13B':
        llm = 'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5'
    else:
        llm = 'replicate/llama70b-v2-chat:e951f18578850b652510200860fc4ea62b3b16fac280f83ff32282f87bbd2e48'

    # the larger the length, the more money
    temperature = st.sidebar.slider(
        'temperature', min_value=0.01, max_value=5.0, value=0.1, step=0.01)
    top_p = st.sidebar.slider('top_p', min_value=0.01,
                              max_value=1.0, value=0.9, step=0.01)
    max_length = st.sidebar.slider(
        'max_length', min_value=64, max_value=4096, value=512, step=8)

os.environ['REPLICATE_API_TOKEN'] = replicate_api

# Store LLM generated responses
if "messages" not in st.session_state.keys():
    st.session_state.messages = [
        {"role": "assistant", "content": "How may I assist you today?"}]

# Display or clear chat messages
# check if the mssages key is in the esion
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])
        st.markdown(message["content"])


def clear_chat_history():
    st.session_state.messages = [
        {"role": "assistant", "content": "How may I assist you today?"}]


st.sidebar.button('Clear Chat History', on_click=clear_chat_history)

# Prompt Engineering - Task parameters
# will perform once
def generate_llama2_response(prompt_input):
    string_dialogue = "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'."
    for dict_message in st.session_state.messages:
        if dict_message["role"] == "user":
            string_dialogue += "User: " + dict_message["content"] + "\n\n"
        else:
            string_dialogue += "Assistant: " + dict_message["content"] + "\n\n"
    output = replicate.run(llm,
                           input={"prompt": f"{string_dialogue} {prompt_input} Assistant: ",
                                  "temperature": temperature, "top_p": top_p, "max_length": max_length, "repetition_penalty": 1})
    return output


# User-provided prompt - define the logic for the chat input box where the user enters prompt message.
if prompt := st.chat_input(disabled=not replicate_api):
    # add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.write(prompt)

# Generate a new response if last message is not from assistant
# if the last message is coming from the user, it will generate the response
if st.session_state.messages[-1]["role"] != "assistant":
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            # call the generate llama function
            response = generate_llama2_response(prompt)
            placeholder = st.empty()
            full_response = ''
            for item in response:  # generation will be printed via empty string
                full_response += item
                placeholder.markdown(full_response)
            placeholder.markdown(full_response)
    message = {"role": "assistant", "content": full_response}
    st.session_state.messages.append(message)  # give chatbot memory
