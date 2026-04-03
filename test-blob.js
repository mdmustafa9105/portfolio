// Test script to verify Firebase Storage upload
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { app } from './firebase';

const testBlobUpload = async () => {
  try {
    console.log('Testing Firebase Storage upload...');

    // Temporarily removed auth check for testing
    // console.log('Checking authentication...');
    // const auth = getAuth(app);
    // const user = auth.currentUser;
    // if (!user) {
    //   throw new Error('User not authenticated. Please log in first.');
    // }
    // console.log('User authenticated:', user.email);

    // Create a small test file
    const testFile = new File(['test content for storage upload'], 'test.txt', { type: 'text/plain' });
    console.log('Test file created:', testFile.name, 'Size:', testFile.size, 'Type:', testFile.type);

    console.log('Initializing Firebase Storage...');
    const storage = getStorage(app);
    console.log('Storage initialized');

    const storageRef = ref(storage, `test/${Date.now()}_test.txt`);
    console.log('Storage ref created:', storageRef.fullPath);

    console.log('Starting uploadBytes...');
    const snapshot = await uploadBytes(storageRef, testFile);
    console.log('uploadBytes completed, snapshot:', snapshot);

    console.log('Getting download URL...');
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Test upload successful! URL:', downloadURL.substring(0, 50) + '...');
    
    return { url: downloadURL, success: true };

  } catch (error) {
    console.error('Firebase Storage test failed:', error);
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Make it available globally
window.testBlobUpload = testBlobUpload;