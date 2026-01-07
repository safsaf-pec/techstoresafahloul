 const app = {
            products: [],
            categories: ['Computers', 'Smartphones', 'Tablets', 'Audio', 'Cameras', 'Accessories', 'Gaming', 'Smart Home'],
            apiProducts: [],
            currentEditId: null,
            charts: {},

            init() {
                this.products = [
                    { id: '1', name: 'Laptop Pro 15"', price: 12999.99, stock: 15, category: 'Computers', image: 'images/laptoppro.jpeg' },
                    { id: '2', name: 'Wireless Mouse', price: 299.99, stock: 50, category: 'Accessories', image: 'images/wirelessmouse.jpeg' },
                    { id: '3', name: 'USB-C Cable 2m', price: 199.99, stock: 100, category: 'Accessories', image: 'images/cableusb.jpeg' },
                    { id: '4', name: 'Smartphone X Pro', price: 8999.99, stock: 30, category: 'Smartphones', image: 'images/IphoneX.webp' },
                    { id: '5', name: 'Wireless Headphones', price: 1499.99, stock: 45, category: 'Audio', image: 'images/HeadphonesPink.jpg' },
                    { id: '6', name: 'MacBook Air M2', price: 15999.99, stock: 20, category: 'Computers', image: 'images/Macbookpro.jpg' },
                    { id: '7', name: 'Gaming Keyboard RGB', price: 899.99, stock: 35, category: 'Gaming', image: 'images/keyboard.jpeg' },
                    { id: '8', name: 'iPad Pro 12.9"', price: 10999.99, stock: 25, category: 'Tablets', image: 'images/ipad.jpeg' },
                    { id: '9', name: 'Sony Camera Alpha', price: 18999.99, stock: 12, category: 'Cameras', image: 'images/camsony.jpeg' },
                    { id: '10', name: 'Smart Speaker Echo', price: 799.99, stock: 60, category: 'Smart Home', image: 'images/smartspeaker.jpeg' },
                    { id: '11', name: '4K Monitor 27"', price: 4499.99, stock: 18, category: 'Accessories', image: 'images/4kmonitor.jpeg' },
                    { id: '12', name: 'Mechanical Keyboard', price: 1299.99, stock: 40, category: 'Accessories', image: 'images/mechanicalkeyboard.jpeg' },
                    { id: '13', name: 'Gaming Mouse Pro', price: 699.99, stock: 55, category: 'Gaming', image: 'images/gamingmouse.jpeg' },
                    { id: '14', name: 'Bluetooth Earbuds', price: 1999.99, stock: 80, category: 'Audio', image: 'images/Bluetooth Earbuds.jpeg' },
                    { id: '15', name: 'External SSD 1TB', price: 1599.99, stock: 65, category: 'Accessories', image: 'images/External SSD 1TB.jpeg' },
                    { id: '16', name: 'Webcam HD 1080p', price: 799.99, stock: 42, category: 'Accessories', image: 'images/Webcam HD 1080p.jpeg' },
                    { id: '17', name: 'Gaming Headset', price: 1299.99, stock: 38, category: 'Gaming', image: 'images/Gaming Headset.jpeg' },
                    { id: '18', name: 'Smart Watch Series 8', price: 3999.99, stock: 28, category: 'Smart Home', image: 'images/Smart Watch Series 8.jpeg' },
                    { id: '19', name: 'Desktop PC Gaming', price: 19999.99, stock: 8, category: 'Computers', image: 'images/Desktop PC Gaming.jpeg' },
                    { id: '20', name: 'Tablet Android 10"', price: 3499.99, stock: 32, category: 'Tablets', image: 'images/Tablet Android 10pouces.jpeg' },
                    { id: '21', name: 'Ring Light LED', price: 499.99, stock: 70, category: 'Cameras', image: 'images/Ring Light LED.jpeg' },
                    { id: '22', name: 'Portable Charger 20K', price: 399.99, stock: 90, category: 'Accessories', image: 'images/Portable Charger 20K.jpeg' },
                    { id: '23', name: 'VR Headset Quest 3', price: 4999.99, stock: 15, category: 'Gaming', image: 'images/VR Headset Quest 3.jpeg' },
                    { id: '24', name: 'Soundbar 5.1', price: 2999.99, stock: 22, category: 'Audio', image: 'images/Soundbar 5.1.jpeg' },
                    { id: '25', name: 'Smart Thermostat', price: 1499.99, stock: 35, category: 'Smart Home', image: 'images/Smart Thermostat.jpeg' }
                ];
                this.setupEventListeners();
                this.renderAll();
                this.updateDashboard();
            },

            setupEventListeners() {
                document.querySelectorAll('.sidebar-menu li').forEach(item => {
                    item.addEventListener('click', () => this.navigateTo(item.dataset.section));
                });
                document.getElementById('search-products').addEventListener('input', e => this.searchProducts(e.target.value));
                document.getElementById('sort-products').addEventListener('change', e => this.sortProducts(e.target.value));
                document.getElementById('product-form').addEventListener('submit', e => {
                    e.preventDefault();
                    this.saveProduct();
                });
            },

            navigateTo(section) {
                document.querySelectorAll('.sidebar-menu li').forEach(i => i.classList.remove('active'));
                document.querySelector(`[data-section="${section}"]`).classList.add('active');
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                document.getElementById(section).classList.add('active');
                const titles = { dashboard: 'Dashboard', products: 'Products', categories: 'Categories', api: 'API Integration' };
                document.getElementById('page-title').textContent = titles[section];
                if (section === 'dashboard') this.updateDashboard();
            },

            openProductModal(productId = null) {
                this.currentEditId = productId;
                const modal = document.getElementById('product-modal');
                const categorySelect = document.getElementById('product-category');
                categorySelect.innerHTML = '<option value="">Select a category</option>';
                this.categories.forEach(cat => categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`);

                if (productId) {
                    document.getElementById('modal-title').textContent = 'Edit Product';
                    const p = this.products.find(p => p.id === productId);
                    if (p) {
                        document.getElementById('product-name').value = p.name;
                        document.getElementById('product-price').value = p.price;
                        document.getElementById('product-stock').value = p.stock;
                        document.getElementById('product-category').value = p.category;
                        document.getElementById('product-image').value = p.image || '';
                    }
                } else {
                    document.getElementById('modal-title').textContent = 'Add Product';
                    document.getElementById('product-form').reset();
                }
                modal.classList.add('active');
            },

            closeProductModal() {
                document.getElementById('product-modal').classList.remove('active');
                document.getElementById('product-form').reset();
                document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
            },

            saveProduct() {
                const data = {
                    name: document.getElementById('product-name').value.trim(),
                    price: parseFloat(document.getElementById('product-price').value),
                    stock: parseInt(document.getElementById('product-stock').value),
                    category: document.getElementById('product-category').value,
                    image: document.getElementById('product-image').value.trim()
                };

                if (!data.name || data.name.length < 3) {
                    document.getElementById('error-name').textContent = 'Name must be at least 3 characters';
                    return;
                }
                if (!data.price || data.price <= 0) {
                    document.getElementById('error-price').textContent = 'Price must be greater than 0';
                    return;
                }
                if (!data.category) {
                    document.getElementById('error-category').textContent = 'Please select a category';
                    return;
                }

                if (this.currentEditId) {
                    const index = this.products.findIndex(p => p.id === this.currentEditId);
                    this.products[index] = { ...this.products[index], ...data };
                } else {
                    this.products.push({ id: Date.now().toString(), ...data });
                }

                this.closeProductModal();
                this.renderProducts();
                this.updateDashboard();
            },

            deleteProduct(id) {
                if (confirm('Delete this product?')) {
                    this.products = this.products.filter(p => p.id !== id);
                    this.renderProducts();
                    this.updateDashboard();
                }
            },

            viewProduct(id) {
                const p = this.products.find(p => p.id === id);
                if (!p) return;
                document.getElementById('product-detail-content').innerHTML = `
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${p.image || 'https://via.placeholder.com/300/CCCCCC/ffffff?text=No+Image'}" style="max-width: 100%; max-height: 300px; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/300/CCCCCC/ffffff?text=Error'">
                    </div>
                    <h3>${p.name}</h3>
                    <p><strong>Price:</strong> ${p.price.toFixed(2)}</p>
                    <p><strong>Stock:</strong> ${p.stock} units</p>
                    <p><strong>Category:</strong> ${p.category}</p>
                    <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                        <button class="btn btn-primary" onclick="app.closeDetailModal(); app.openProductModal('${p.id}')">Edit</button>
                        <button class="btn btn-secondary" onclick="app.closeDetailModal()">Close</button>
                    </div>
                `;
                document.getElementById('detail-modal').classList.add('active');
            },

            closeDetailModal() {
                document.getElementById('detail-modal').classList.remove('active');
            },

            searchProducts(query) {
                const filtered = this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
                const isGridView = document.getElementById('grid-view').classList.contains('active');
                if (isGridView) {
                    this.renderProductsGrid(filtered);
                } else {
                    this.renderProducts(filtered);
                }
            },

            sortProducts(sortBy) {
                let sorted = [...this.products];
                if (sortBy === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
                if (sortBy === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
                if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
                if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
                const isGridView = document.getElementById('grid-view').classList.contains('active');
                if (isGridView) {
                    this.renderProductsGrid(sorted);
                } else {
                    this.renderProducts(sorted);
                }
            },

            toggleView(view) {
                const gridViewBtn = document.getElementById('grid-view-btn');
                const tableViewBtn = document.getElementById('table-view-btn');
                const gridView = document.getElementById('grid-view');
                const tableView = document.getElementById('table-view');

                if (view === 'grid') {
                    gridViewBtn.classList.add('active');
                    tableViewBtn.classList.remove('active');
                    gridView.classList.add('active');
                    tableView.classList.remove('active');
                    this.renderProductsGrid();
                } else {
                    gridViewBtn.classList.remove('active');
                    tableViewBtn.classList.add('active');
                    gridView.classList.remove('active');
                    tableView.classList.add('active');
                }
            },

            renderProductsGrid(list = null) {
                const products = list || this.products;
                const grid = document.getElementById('products-grid');
                
                if (products.length === 0) {
                    grid.innerHTML = '<p style="text-align: center; padding: 40px;">No products found</p>';
                    return;
                }

                grid.innerHTML = products.map(p => `
                    <div class="product-card" onclick="app.viewProduct('${p.id}')">
                        <img src="${p.image || 'https://via.placeholder.com/220/CCCCCC/ffffff?text=No+Image'}" 
                             class="product-card-image" 
                             onerror="this.src='https://via.placeholder.com/220/CCCCCC/ffffff?text=Error'">
                        <div class="product-card-body">
                            <div class="product-card-category">${p.category}</div>
                            <div class="product-card-title">${p.name}</div>
                            <div class="product-card-footer">
                                <div class="product-card-price">${p.price.toFixed(2)} DH</div>
                                <div class="product-card-stock">Stock: ${p.stock}</div>
                            </div>
                            <div class="product-card-actions">
                                <button class="btn btn-success btn-sm" onclick="event.stopPropagation(); app.openProductModal('${p.id}')">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); app.deleteProduct('${p.id}')">Delete</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            },

            renderProducts(list = null) {
                const products = list || this.products;
                const tbody = document.getElementById('products-tbody');
                if (products.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">No products found</td></tr>';
                    return;
                }
                tbody.innerHTML = products.map(p => `
                    <tr>
                        <td><img src="${p.image || 'https://via.placeholder.com/50/CCCCCC/ffffff?text=No+Image'}" class="product-image" onerror="this.src='https://via.placeholder.com/50/CCCCCC/ffffff?text=Error'"></td>
                        <td>${p.name}</td>
                        <td>${p.price.toFixed(2)}</td>
                        <td>${p.stock}</td>
                        <td><span style="background: #ecf0f1; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${p.category}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-primary btn-sm" onclick="app.viewProduct('${p.id}')">View</button>
                                <button class="btn btn-success btn-sm" onclick="app.openProductModal('${p.id}')">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="app.deleteProduct('${p.id}')">Delete</button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            },

            addCategory() {
                const input = document.getElementById('new-category');
                const cat = input.value.trim();
                if (!cat) { alert('Enter a category name'); return; }
                if (this.categories.includes(cat)) { alert('Category exists'); return; }
                this.categories.push(cat);
                input.value = '';
                this.renderCategories();
                this.updateDashboard();
            },

            deleteCategory(cat) {
                if (confirm(`Delete "${cat}"?`)) {
                    if (this.products.some(p => p.category === cat)) {
                        alert('Cannot delete category with products');
                        return;
                    }
                    this.categories = this.categories.filter(c => c !== cat);
                    this.renderCategories();
                    this.updateDashboard();
                }
            },

            renderCategories() {
                const list = document.getElementById('category-list');
                list.innerHTML = this.categories.map(cat => `
                    <div class="category-tag">
                        <span>${cat}</span>
                        <span class="delete-cat" onclick="app.deleteCategory('${cat}')">&times;</span>
                    </div>
                `).join('');
            },

            updateDashboard() {
                document.getElementById('kpi-total-products').textContent = this.products.length;
                const totalValue = this.products.reduce((sum, p) => sum + (p.price * p.stock), 0);
                document.getElementById('kpi-stock-value').textContent = totalValue.toFixed(2) + ' DH';
                document.getElementById('kpi-categories').textContent = this.categories.length;
                this.renderCharts();
            },

            renderCharts() {
                const catCount = {};
                const catValue = {};
                this.categories.forEach(cat => { catCount[cat] = 0; catValue[cat] = 0; });
                this.products.forEach(p => {
                    catCount[p.category]++;
                    catValue[p.category] += p.price * p.stock;
                });

                if (this.charts.category) this.charts.category.destroy();
                this.charts.category = new Chart(document.getElementById('categoryChart'), {
                    type: 'bar',
                    data: {
                        labels: Object.keys(catCount),
                        datasets: [{ label: 'Products', data: Object.values(catCount), backgroundColor: '#3498db' }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });

                if (this.charts.stock) this.charts.stock.destroy();
                this.charts.stock = new Chart(document.getElementById('stockChart'), {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(catValue),
                        datasets: [{ data: Object.values(catValue), backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12'] }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            },

            /*fetchAPIData() {
                const status = document.getElementById('api-status');
                status.innerHTML = '<p>Loading...</p>';
                
                fetch('https://fakestoreapi.com/products')
                    .then(response => response.json())
                    .then(data => {
                        //this.apiProducts = data;
                         this.apiProducts = data.filter(p => p.category === 'electronics');
                         if (this.apiProducts.length === 0) {
                             status.innerHTML = '<p style="color: #e74c3c;">No electronics products found</p>';
                             document.getElementById('api-products-count').textContent = 0;
                             document.getElementById('api-products-container').innerHTML = '';
                             return;
                         }
                       // status.innerHTML = '<p style="color: #27ae60;">✓ Data loaded successfully!</p>';
                        document.getElementById('api-products-count').textContent = data.length;
                        const container = document.getElementById('api-products-container');
                        container.innerHTML = '<div class="api-grid">' + 
                            data.slice(0, 12).map(p => `
                                <div class="api-card">
                                    <img src="${p.image}" onerror="this.src='https://via.placeholder.com/150/CCCCCC/ffffff?text=No+Image'">
                                    <h4>${p.title}</h4>
                                    <p class="price">${p.price}</p>
                                </div>
                            `).join('') + '</div>';
                    })
                    .catch(error => {
                        status.innerHTML = '<p style="color: #e74c3c;">✗ Error: ' + error.message + '</p>';
                    });
            },*/
            fetchAPIData() {
    const status = document.getElementById('api-status');
    status.innerHTML = '<p>Loading...</p>';

    const self = this;

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            self.apiProducts = data.filter(p => p.category === 'electronics');

            if (self.apiProducts.length === 0) {
                status.innerHTML = '<p style="color: #e74c3c;">No electronics products found</p>';
                document.getElementById('api-products-count').textContent = 0;
                document.getElementById('api-products-container').innerHTML = '';
                return;
            }

            status.innerHTML = '<p style="color: #27ae60;">✓ Electronics products loaded successfully!</p>';
            document.getElementById('api-products-count').textContent = self.apiProducts.length;

            const container = document.getElementById('api-products-container');
            container.innerHTML = '<div class="api-grid">' +
                self.apiProducts.map(p => `
                    <div class="api-card" style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; text-align: center; width: 150px; margin: 10px;">
                        <img src="${p.image}" style="width: 100px; height: 100px; object-fit: contain;" 
                             onerror="this.src='https://via.placeholder.com/150/CCCCCC/ffffff?text=No+Image'">
                        <h4 style="font-size: 12px; height: 40px; overflow: hidden;">${p.title}</h4>
                        <p style="color: #e74c3c; font-weight: bold;">${p.price} $</p>
                    </div>
                `).join('') + '</div>';
        })
        .catch(error => {
            status.innerHTML = '<p style="color: #e74c3c;">✗ Error: ' + error.message + '</p>';
        });
},

renderAll() {
    this.renderProducts();
    this.renderCategories();
    this.updateDashboard(); // met à jour les KPIs et graphiques
} // <- pas de virgule ici car c'est la dernière méthode
}; // <- fermeture de l'objet app

// Hors de l'objet app
document.addEventListener('DOMContentLoaded', () => app.init());
