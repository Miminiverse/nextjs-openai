// Uploads a file
export const uploadFile = async (file) => {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
    });

    if (!response.ok) {
      console.error('File upload failed');
      throw new Error('File upload failed');
    }

    const responseData = await response.json();
    console.log('File uploaded successfully:', responseData);
    return responseData; // If you need to use the response data in the caller function
  }
  catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};


export const createAssistant = async (fileId) => {
  try {
    const response = await fetch('/api/assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileId })
    });

    if (!response.ok) {
      console.error('Failed');
    }

    const responseData = await response.json();
    console.log('Assistant created successfully:', responseData);
    return responseData;
  }
  catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};


export const createThread = async (fileId) => {
  try {
    const response = await fetch('/api/thread', {
      method: 'POST',
    });

    if (!response.ok) {
      console.error('Failed');
    }

    const responseData = await response.json();
    console.log('Thread created successfully:', responseData);
    return responseData;
  }
  catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};


export const createMessage = async (threadId) => {
  console.log(threadId)
  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId })
    });

    if (!response.ok) {
      console.error('Failed');
    }

    const responseData = await response.json();
    console.log('Message created successfully:', responseData);
    return responseData;
  }
  catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};


export const createRun = async (threadId, assistantId) => {
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, assistantId })
    });

    if (!response.ok) {
      console.error('Failed');
    }

    const responseData = await response.json();
    console.log('Run successfully:', responseData);
    return responseData;
  }
  catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};

export const listMessages = async (threadId) => {

  try {
    const response = await fetch('/api/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId })
    });

    if (!response.ok) {
      console.error('Failed');
    }

    const responseData = await response.json();
    console.log('List messages successfully:', responseData);
    return responseData;
  }
  catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};


export const checkRun = async (threadId, assistantId) => {
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, assistantId })
    });

    if (!response.ok) {
      console.error('Failed');
    }

    const responseData = await response.json();
    console.log('Run successfully:', responseData);
    return responseData;
  }
  catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};