import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Import for storage functionality

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAv79vELbrkpL6byiulhywdkSOUBla-sgo",
    authDomain: "lentra-18d70.firebaseapp.com",
    projectId: "lentra-18d70",
    storageBucket: "lentra-18d70.firebasestorage.app",
    messagingSenderId: "541954395975",
    appId: "1:541954395975:web:3157247c412d6209d98662",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Firebase Storage

// Get products
export const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
    });
    return products;
};

// Add product
export const addProduct = async (product) => {
    const docRef = await addDoc(collection(db, 'products'), product);
    return docRef.id;
};

// Delete product
export const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
};

// Update product
export const updateProduct = async (id, updatedProduct) => {
    const productRef = doc(db, 'products', id); // Get reference to the product by ID
    await updateDoc(productRef, updatedProduct);  // Update the product document in Firestore
};
// Get a single product by ID
export const getProductById = async (id) => {
    const docRef = doc(db, 'products', id);  // Get reference to product by ID
    const docSnap = await getDoc(docRef);   // Fetch the document snapshot

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };  // Return the product data with ID
    } else {
        return null;  // Return null if the product doesn't exist
    }
};

// Upload image to Firebase Storage
export const uploadImage = async (file) => {
    const storageRef = ref(storage, 'images/' + file.name);  // Store in 'images' folder
    await uploadBytes(storageRef, file);  // Upload the file to Firebase Storage
    const imageURL = await getDownloadURL(storageRef);  // Get the URL for the uploaded image
    return imageURL;  // Return the image URL
};


// Assuming you have a function to update a product's "featured" status
// Add a product to the featured collection
export const setProductAsFeatured = async (product) => {
    const featuredCollectionRef = collection(db, 'featuredProducts');

    // Add the product to the featured products collection
    await addDoc(featuredCollectionRef, product);
};

// Get featured products from Firebase
export const getFeaturedProducts = async () => {
    const featuredCollectionRef = collection(db, 'featuredProducts');
    const querySnapshot = await getDocs(featuredCollectionRef);

    const featuredProducts = [];
    querySnapshot.forEach(doc => {
        featuredProducts.push({ id: doc.id, ...doc.data() });
    });

    return featuredProducts;
};
