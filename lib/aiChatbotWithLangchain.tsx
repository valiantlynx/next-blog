import { HuggingFaceInference } from "langchain/llms";

type Props = {
    chatInput: string;
};

export default async function aiChatbotWithLangchain({ chatInput }: Props) {

    const model = new HuggingFaceInference({ model: "gpt2" });
    const input = chatInput;

    const res = await model.call(input).then((res) => {
        return res;
    }).catch((err) => {
        //console.log("err: ", err)
        return err.message;
    });

    //console.log({ res });

  
    //console.log(`Got output ${res}`);

    return res;
}