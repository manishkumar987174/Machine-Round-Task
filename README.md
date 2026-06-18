
# steps to run locally

# baceknd setup
1-> cd backend
2-> npm install
3-> add .env file and inside .env add these two
    MONGO_URI=mongodb://localhost:27017/inventorydb
    PORT=5000
4-> npm run dev


# Frontend setup
1-> cd frontend 
2-> npm install
3-> add .env file and inside .env add 
    VITE_API_URL=http://localhost:5000/api/products
4-> npm run dev
