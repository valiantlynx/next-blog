import { HuggingFaceInference } from "langchain/llms";

type Props = {
    chatInput: string;
};

export default async function aiChatbotWithLangchain({ chatInput }: Props) {

    const model = new HuggingFaceInference({ 
        model: "gpt2",

        // need api key to use gpt2 model, longer but it send error when building the app. works fine when running the app
        //apiKey: process.env.HUGGINGFACE_API_KEY,
     });

    const input = chatInput;

    const res = await model.call(input).then((res) => {
        return res;
    }).catch((err) => {
        console.log("err: ", err)
        return err.message;
    });
  
    console.log(`Got output ${res}`);

    return res;
}