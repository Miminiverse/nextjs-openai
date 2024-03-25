import { resolve } from "path";
// import { checkRunStatus, listMessages } from "./api";


export const fetchAssistantResponse = async (threadId, runId, setStatusMessage) => {
    // try {

    //     let status: string
    //     let fetchCount = 0

    //     do {
    //         const statusData = await checkRunStatus(threadId, runId)
    //         status = statusData.runStatus
    //         fetchCount++
    //         console.log(statusData)
    //         if (status === 'cancelled' || status === 'cancelling' || status === 'failed' || status === 'expired') {
    //             throw new Error(status);
    //         }
    //         setStatusMessage(`current status: ${status}`)
    //         await new Promise(resolve => setTimeout(resolve, 1000))
    //         if (status === "completed") {
    //             break;
    //         }
    //     } while (true);
    //     setStatusMessage("Asssistant response fetch successfully")
    //     const response = await listMessages(threadId)
    //     console.log(response)
    //     return response.messages
    // }
    // catch (error) {
    //     console.error('Error:', error);
    //     throw error; // Rethrow the error to handle it in the caller function if needed
    // }
};