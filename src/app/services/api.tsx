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
    console.log({"fileId": fileId})
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