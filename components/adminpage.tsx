'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  Tag,
  Plus,
  Search,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Sparkles,
  ArrowRight,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';

import { useShop } from '../context/shopcontext';
import { Order, Product } from '../types';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:7000/api';

const BACKEND_URL = API_URL.replace(/\/api\/?$/, '');

export const AdminPage: React.FC = () => {
  const {
    products,
    orders,
    coupons,
    updateProductStock,
    updateOrderStatus,
    addNewCoupon,
    addNewProduct,
    updateProduct,
    deleteProduct,
    navigate,
    addToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'inventory' | 'coupons'
  >('overview');

  const [tableSearch, setTableSearch] = useState('');

  // ================= COUPON =================

  const [showAddCouponModal, setShowAddCouponModal] =
    useState(false);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15');
  const [newCouponMinSpend, setNewCouponMinSpend] = useState('50');

  // ================= PRODUCT CREATE =================

  const [showAddProductModal, setShowAddProductModal] =
    useState(false);

  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] =
    useState('T-Shirts');

  const [newProdGender, setNewProdGender] = useState<
    'men' | 'women' | 'kids'
  >('men');

  const [newProdPrice, setNewProdPrice] = useState('75');
  const [newProdStock, setNewProdStock] = useState('30');

  const [newProdImages, setNewProdImages] =
    useState<File[]>([]);

  const [isCreatingProduct, setIsCreatingProduct] =
    useState(false);

  // ================= PRODUCT EDIT =================

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [editProductImages, setEditProductImages] =
    useState<File[]>([]);

  const [isSavingProduct, setIsSavingProduct] =
    useState(false);

  // ================= METRICS =================

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.total,
    0
  );

  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;

  const lowStockProducts = products.filter(
    (p) => p.stock < 10
  );

  // ================= IMAGE URL =================

  const getProductImageUrl = (image?: string) => {
    if (!image) return '';

    if (
      image.startsWith('http://') ||
      image.startsWith('https://')
    ) {
      return image;
    }

    return `${BACKEND_URL}/${image.replace(/^\/+/, '')}`;
  };

  // ================= CREATE COUPON =================

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCouponCode.trim()) {
      addToast(
        'Coupon Error',
        'Please enter a coupon code.',
        'error'
      );
      return;
    }

    addNewCoupon({
      code: newCouponCode.toUpperCase(),
      discountPercentage: Number(newCouponDiscount),
      minSpend: Number(newCouponMinSpend),
      expiryDate: '2026-12-31',
      usedCount: 0,
    });

    setNewCouponCode('');
    setShowAddCouponModal(false);
  };

  // ================= CREATE PRODUCT =================

  const handleCreateProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!newProdName.trim()) {
      addToast(
        'Product Error',
        'Please enter a product title.',
        'error'
      );
      return;
    }

    if (newProdImages.length === 0) {
      addToast(
        'Product Image Required',
        'Please select at least one product image.',
        'error'
      );
      return;
    }

    const price = Number(newProdPrice);
    const stock = Number(newProdStock);

    if (price <= 0) {
      addToast(
        'Product Error',
        'Please enter a valid product price.',
        'error'
      );
      return;
    }

    if (stock < 0) {
      addToast(
        'Product Error',
        'Stock cannot be negative.',
        'error'
      );
      return;
    }

    const slug = newProdName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    setIsCreatingProduct(true);

    try {
      const success = await addNewProduct(
        {
          name: newProdName.trim(),
          slug,
          gender: newProdGender,
          category: newProdCategory,
          price,
          originalPrice: Math.round(price * 1.25),
          discount: 0,
          rating: 5,
          reviewsCount: 0,
          description: `Luxury ${newProdCategory.toLowerCase()} tailored in organic certified materials.`,
          sizes: ['S', 'M', 'L', 'XL'],
          colors: [
            {
              name: 'Onyx Black',
              hex: '#1A1A1A',
            },
            {
              name: 'Pure Ivory',
              hex: '#F9F8F5',
            },
          ],
          stock,
          sku: `VEL-${slug
            .slice(0, 4)
            .toUpperCase()}-${Date.now()
            .toString()
            .slice(-4)}`,
          isNewArrival: true,
        },
        newProdImages
      );

      if (!success) return;

      setNewProdName('');
      setNewProdCategory('T-Shirts');
      setNewProdGender('men');
      setNewProdPrice('75');
      setNewProdStock('30');
      setNewProdImages([]);
      setShowAddProductModal(false);
    } finally {
      setIsCreatingProduct(false);
    }
  };

  // ================= OPEN EDIT =================

  const handleEditProduct = (product: Product) => {
    setEditingProduct({
      ...product,
    });

    setEditProductImages([]);
  };

  // ================= SAVE EDIT =================

  const handleSaveProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!editingProduct) return;

    if (!editingProduct.name.trim()) {
      addToast(
        'Product Error',
        'Product name is required.',
        'error'
      );
      return;
    }

    if (Number(editingProduct.price) <= 0) {
      addToast(
        'Product Error',
        'Product price must be greater than 0.',
        'error'
      );
      return;
    }

    if (Number(editingProduct.stock) < 0) {
      addToast(
        'Product Error',
        'Stock cannot be negative.',
        'error'
      );
      return;
    }

    setIsSavingProduct(true);

    try {
      await updateProduct(
        editingProduct.id,
        {
          name: editingProduct.name.trim(),
          slug: editingProduct.slug,
          gender: editingProduct.gender,
          category: editingProduct.category,
          price: Number(editingProduct.price),
          originalPrice: Number(
            editingProduct.originalPrice
          ),
          discount: Number(editingProduct.discount),
          description:
            editingProduct.description || '',
          sizes: editingProduct.sizes || [],
          colors: editingProduct.colors || [],
          details: editingProduct.details,
          stock: Number(editingProduct.stock),
          sku: editingProduct.sku,
          rating: Number(editingProduct.rating || 0),
          reviewsCount: Number(
            editingProduct.reviewsCount || 0
          ),
          isNewArrival:
            editingProduct.isNewArrival,
          isTrending:
            editingProduct.isTrending,
          isSale:
            editingProduct.isSale,
          material:
            editingProduct.material,
          fit:
            editingProduct.fit,
          careInstructions:
            editingProduct.careInstructions,
        },
    
      );

      setEditingProduct(null);
      setEditProductImages([]);
    } finally {
      setIsSavingProduct(false);
    }
  };

  // ================= DELETE PRODUCT =================

  const handleDeleteProduct = async (
    product: Product
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    await deleteProduct(product.id);
  };

  // ================= CLOSE EDIT =================

  const closeEditModal = () => {
    if (isSavingProduct) return;

    setEditingProduct(null);
    setEditProductImages([]);
  };

  return (
    <div
      id="admin-dashboard-container"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E6DF]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.25em] text-[#A3433B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VELORA ATELIER MANAGEMENT</span>
          </div>

          <h1 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A] mt-1">
            Store Administration Dashboard
          </h1>
        </div>

        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-[#FAF9F6] border border-[#DDD9CE] hover:border-[#1A1A1A] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] rounded-lg transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <span>Return to Storefront</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ================= TABS ================= */}

      <div className="flex bg-[#EFECE6] p-1 rounded-2xl overflow-x-auto text-xs font-bold uppercase tracking-wider space-x-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all flex-shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'text-[#5A5854] hover:text-[#1A1A1A]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all flex-shrink-0 ${
            activeTab === 'products'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'text-[#5A5854] hover:text-[#1A1A1A]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all flex-shrink-0 ${
            activeTab === 'orders'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'text-[#5A5854] hover:text-[#1A1A1A]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all flex-shrink-0 ${
            activeTab === 'inventory'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'text-[#5A5854] hover:text-[#1A1A1A]'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>
            Inventory ({lowStockProducts.length} low)
          </span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all flex-shrink-0 ${
            activeTab === 'coupons'
              ? 'bg-[#1A1A1A] text-white shadow-xs'
              : 'text-[#5A5854] hover:text-[#1A1A1A]'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Promotions & Coupons</span>
        </button>
      </div>

      {/* ================= OVERVIEW ================= */}

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C8880]">
                  Total Revenue
                </span>

                <div className="p-2 bg-[#E8F3EB] text-[#2A6E3F] rounded-lg">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-bold text-[#1A1A1A]">
                ${totalRevenue.toFixed(2)}
              </div>

              <p className="text-[11px] text-[#2A6E3F] font-semibold flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18.4% vs last month</span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C8880]">
                  Total Orders
                </span>

                <div className="p-2 bg-[#EBF3FB] text-[#2C6ECB] rounded-lg">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-bold text-[#1A1A1A]">
                {totalOrdersCount} Completed
              </div>

              <p className="text-[11px] text-[#8C8880]">
                Average Order: $
                {(
                  totalRevenue /
                  Math.max(1, totalOrdersCount)
                ).toFixed(2)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C8880]">
                  Live Catalog
                </span>

                <div className="p-2 bg-[#FAF3E0] text-[#B58D5C] rounded-lg">
                  <Package className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-bold text-[#1A1A1A]">
                {totalProductsCount} Garments
              </div>

              <p className="text-[11px] text-[#8C8880]">
                Men, Women & Kids active
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E6DF] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C8880]">
                  Stock Alerts
                </span>

                <div className="p-2 bg-[#F9ECEB] text-[#A3433B] rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-bold text-[#A3433B]">
                {lowStockProducts.length} Styles Low
              </div>

              <p className="text-[11px] text-[#8C8880]">
                Below 10 units in stock
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E6DF] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                Recent Client Acquisitions
              </h3>

              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-bold uppercase tracking-wider text-[#A3433B] hover:underline"
              >
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4F1EA] text-[#1A1A1A] uppercase tracking-wider font-semibold border-b border-[#E0DDD5]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E8E6DF]">
                  {orders.slice(0, 5).map((ord) => (
                    <tr
                      key={ord.id}
                      className="hover:bg-[#FAF9F6]"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#1A1A1A]">
                        #{ord.id}
                      </td>

                      <td className="py-3 px-4 font-semibold text-[#1A1A1A]">
                        {ord.shippingAddress.fullName}
                      </td>

                      <td className="py-3 px-4 text-[#8C8880]">
                        {ord.createdAt}
                      </td>

                      <td className="py-3 px-4 uppercase text-[#5A5854]">
                        {ord.paymentMethod}
                      </td>

                      <td className="py-3 px-4 font-bold text-[#1A1A1A]">
                        ${ord.total.toFixed(2)}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-[#E8F3EB] text-[#2A6E3F] text-[10px] font-bold uppercase rounded-full">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRODUCTS ================= */}

      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-[#E8E6DF] p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={tableSearch}
                onChange={(e) =>
                  setTableSearch(e.target.value)
                }
                placeholder="Search products by title or category..."
                className="w-full p-2.5 pl-8 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-xs"
              />

              <Search className="w-4 h-4 text-[#8C8880] absolute left-2.5 top-3" />
            </div>

            <button
              onClick={() =>
                setShowAddProductModal(true)
              }
              className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Garment</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F1EA] text-[#1A1A1A] uppercase tracking-wider font-semibold border-b border-[#E0DDD5]">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E8E6DF]">
                {products
                  .filter(
                    (p) =>
                      p.name
                        .toLowerCase()
                        .includes(
                          tableSearch.toLowerCase()
                        ) ||
                      p.category
                        .toLowerCase()
                        .includes(
                          tableSearch.toLowerCase()
                        )
                  )
                  .map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-[#FAF9F6]"
                    >
                      <td className="py-3 px-4 flex items-center space-x-3">
                        <img
                          src={getProductImageUrl(
                            p.images?.[0]
                          )}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-11 rounded object-cover"
                        />

                        <div>
                          <strong className="text-[#1A1A1A] block">
                            {p.name}
                          </strong>

                          <span className="text-[10px] text-[#8C8880]">
                            ★ {p.rating} ({p.reviewsCount})
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 uppercase text-[#5A5854] font-medium">
                        {p.gender}
                      </td>

                      <td className="py-3 px-4 text-[#5A5854]">
                        {p.category}
                      </td>

                      <td className="py-3 px-4 font-bold text-[#1A1A1A]">
                        ${p.price}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stock < 10
                              ? 'bg-[#F9ECEB] text-[#A3433B]'
                              : 'bg-[#E8F3EB] text-[#2A6E3F]'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-[#8C8880] text-[11px]">
                        {p.sku}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleEditProduct(p)
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#DDD9CE] text-[#1A1A1A] hover:bg-[#EFECE6] font-semibold"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteProduct(p)
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/product/${p.slug}`
                              )
                            }
                            className="text-xs text-[#1A1A1A] font-semibold hover:underline ml-1"
                          >
                            View PDP →
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= ORDERS ================= */}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-[#E8E6DF] p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
              Customer Orders Fulfillment
            </h3>

            <span className="text-xs text-[#8C8880]">
              {orders.length} total orders recorded
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F1EA] text-[#1A1A1A] uppercase tracking-wider font-semibold border-b border-[#E0DDD5]">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">
                    Customer & City
                  </th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Items Count</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">
                    Update Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E8E6DF]">
                {orders.map((ord) => (
                  <tr
                    key={ord.id}
                    className="hover:bg-[#FAF9F6]"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#1A1A1A]">
                      #{ord.id}
                    </td>

                    <td className="py-3 px-4">
                      <strong className="text-[#1A1A1A] block">
                        {ord.shippingAddress.fullName}
                      </strong>

                      <span className="text-[10px] text-[#8C8880]">
                        {ord.shippingAddress.city},{' '}
                        {ord.shippingAddress.state}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-[#8C8880]">
                      {ord.createdAt}
                    </td>

                    <td className="py-3 px-4 font-semibold text-[#1A1A1A]">
                      {ord.items.length} garments
                    </td>

                    <td className="py-3 px-4 font-bold text-[#1A1A1A]">
                      ${ord.total.toFixed(2)}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            ord.id,
                            e.target.value as Order['status']
                          )
                        }
                        className="px-2.5 py-1 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-xs font-semibold text-[#1A1A1A] cursor-pointer"
                      >
                        <option value="Processing">
                          Processing
                        </option>
                        <option value="Shipped">
                          Shipped (In Transit)
                        </option>
                        <option value="Delivered">
                          Delivered
                        </option>
                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= INVENTORY ================= */}

      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-[#E8E6DF] p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
              Stock & Inventory Management
            </h3>

            <p className="text-xs text-[#8C8880]">
              Real-time unit adjustments sync instantly across
              product pages.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F1EA] text-[#1A1A1A] uppercase tracking-wider font-semibold border-b border-[#E0DDD5]">
                <tr>
                  <th className="py-3 px-4">Garment</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Alert Level</th>
                  <th className="py-3 px-4">Quick Adjust</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E8E6DF]">
                {products.map((p) => {
                  const isLow = p.stock < 10;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-[#FAF9F6]"
                    >
                      <td className="py-3 px-4 font-bold text-[#1A1A1A]">
                        {p.name}
                      </td>

                      <td className="py-3 px-4 font-mono text-[#8C8880]">
                        {p.sku}
                      </td>

                      <td className="py-3 px-4 font-bold text-sm text-[#1A1A1A]">
                        {p.stock}
                      </td>

                      <td className="py-3 px-4">
                        {isLow ? (
                          <span className="px-2 py-0.5 bg-[#F9ECEB] text-[#A3433B] text-[10px] font-bold uppercase rounded-md flex items-center space-x-1 w-fit">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Low Stock Alert</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-[#E8F3EB] text-[#2A6E3F] text-[10px] font-bold uppercase rounded-md w-fit">
                            Optimal
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateProductStock(
                              p.id,
                              Math.max(0, p.stock - 5)
                            )
                          }
                          className="px-2.5 py-1 bg-[#FAF9F6] border border-[#DDD9CE] hover:bg-[#EFECE6] rounded font-bold text-xs"
                        >
                          -5
                        </button>

                        <button
                          onClick={() =>
                            updateProductStock(
                              p.id,
                              Math.max(0, p.stock - 1)
                            )
                          }
                          className="px-2.5 py-1 bg-[#FAF9F6] border border-[#DDD9CE] hover:bg-[#EFECE6] rounded font-bold text-xs"
                        >
                          -1
                        </button>

                        <button
                          onClick={() =>
                            updateProductStock(
                              p.id,
                              p.stock + 1
                            )
                          }
                          className="px-2.5 py-1 bg-[#FAF9F6] border border-[#DDD9CE] hover:bg-[#EFECE6] rounded font-bold text-xs"
                        >
                          +1
                        </button>

                        <button
                          onClick={() =>
                            updateProductStock(
                              p.id,
                              p.stock + 10
                            )
                          }
                          className="px-2.5 py-1 bg-[#1A1A1A] text-white hover:bg-black rounded font-bold text-xs"
                        >
                          +10 Restock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= COUPONS ================= */}

      {activeTab === 'coupons' && (
        <div className="bg-white rounded-2xl border border-[#E8E6DF] p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                Active Atelier Promotions
              </h3>

              <p className="text-xs text-[#8C8880]">
                Coupons can be entered at cart or checkout.
              </p>
            </div>

            <button
              onClick={() =>
                setShowAddCouponModal(true)
              }
              className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-black flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#DDD9CE] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-base text-[#1A1A1A] bg-white px-2.5 py-1 rounded-md border border-[#DDD9CE]">
                    {c.code}
                  </span>

                  <span className="text-sm font-bold text-[#2A6E3F]">
                    {c.discountPercentage}% OFF
                  </span>
                </div>

                <div className="text-xs text-[#5A5854] space-y-1">
                  <p>
                    Min. Spend:{' '}
                    <strong>${c.minSpend}</strong>
                  </p>

                  <p>
                    Valid Through:{' '}
                    <strong>{c.expiryDate}</strong>
                  </p>

                  <p>
                    Total Redemptions:{' '}
                    <strong>{c.usedCount} times</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ADD COUPON MODAL ================= */}

      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-luxury text-lg font-bold">
                Create Promo Voucher
              </h3>

              <button
                onClick={() =>
                  setShowAddCouponModal(false)
                }
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateCoupon}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold block mb-1">
                  Coupon Code
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. VIPSPRING25"
                  value={newCouponCode}
                  onChange={(e) =>
                    setNewCouponCode(e.target.value)
                  }
                  className="w-full p-2.5 border rounded-lg uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">
                    Discount (%)
                  </label>

                  <input
                    type="number"
                    min="5"
                    max="90"
                    value={newCouponDiscount}
                    onChange={(e) =>
                      setNewCouponDiscount(e.target.value)
                    }
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">
                    Min Spend ($)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={newCouponMinSpend}
                    onChange={(e) =>
                      setNewCouponMinSpend(e.target.value)
                    }
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowAddCouponModal(false)
                  }
                  className="flex-1 py-2.5 border rounded-lg font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1A1A1A] text-white rounded-lg font-bold uppercase tracking-wider"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ADD PRODUCT MODAL ================= */}

      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-luxury text-lg font-bold">
                Add New Garment
              </h3>

              <button
                type="button"
                onClick={() => {
                  setShowAddProductModal(false);
                  setNewProdImages([]);
                }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateProduct}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold block mb-1">
                  Garment Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Italian Cashmere Trench"
                  value={newProdName}
                  onChange={(e) =>
                    setNewProdName(e.target.value)
                  }
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">
                    Department
                  </label>

                  <select
                    value={newProdGender}
                    onChange={(e) =>
                      setNewProdGender(
                        e.target.value as
                          | 'men'
                          | 'women'
                          | 'kids'
                      )
                    }
                    className="w-full p-2.5 border rounded-lg"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">
                    Category
                  </label>

                  <input
                    type="text"
                    value={newProdCategory}
                    onChange={(e) =>
                      setNewProdCategory(e.target.value)
                    }
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">
                    Price ($)
                  </label>

                  <input
                    type="number"
                    min="1"
                    required
                    value={newProdPrice}
                    onChange={(e) =>
                      setNewProdPrice(e.target.value)
                    }
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">
                    Stock Units
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={newProdStock}
                    onChange={(e) =>
                      setNewProdStock(e.target.value)
                    }
                    className="w-full p-2.5 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">
                  Product Images
                </label>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(
                      e.target.files || []
                    ).slice(0, 8);

                    setNewProdImages(files);
                  }}
                  className="w-full p-2.5 border rounded-lg bg-white"
                />

                <p className="text-[10px] text-[#8C8880] mt-1">
                  JPG, PNG, WEBP or AVIF · Max 8 images ·
                  Max 5MB each
                </p>

                {newProdImages.length > 0 && (
                  <div className="mt-2 p-2 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg">
                    <p className="font-semibold text-[#1A1A1A] mb-1">
                      {newProdImages.length} image
                      {newProdImages.length > 1
                        ? 's'
                        : ''}{' '}
                      selected
                    </p>

                    <div className="space-y-1">
                      {newProdImages.map(
                        (file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="text-[10px] text-[#5A5854] truncate"
                          >
                            {index + 1}. {file.name}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProductModal(false);
                    setNewProdImages([]);
                  }}
                  className="flex-1 py-2.5 border rounded-lg font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isCreatingProduct}
                  className="flex-1 py-2.5 bg-[#1A1A1A] text-white rounded-lg font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {isCreatingProduct
                    ? 'Adding...'
                    : 'Add Garment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT PRODUCT MODAL ================= */}

      {editingProduct && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl my-8">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#E8E6DF] pb-4 mb-5">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
                  Edit Product
                </h3>

                <p className="text-xs text-[#8C8880] mt-1">
                  Update product information and images
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={isSavingProduct}
                className="p-1.5 rounded-lg hover:bg-[#F4F1EA] disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveProduct}
              className="space-y-4 text-xs"
            >
              {/* NAME */}

              <div>
                <label className="font-bold block mb-1">
                  Garment Name
                </label>

                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-[#DDD9CE] rounded-lg"
                />
              </div>

              {/* DEPARTMENT + CATEGORY */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">
                    Department
                  </label>

                  <select
                    value={editingProduct.gender}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        gender:
                          e.target.value as Product['gender'],
                      })
                    }
                    className="w-full p-2.5 border border-[#DDD9CE] rounded-lg"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">
                    Category
                  </label>

                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full p-2.5 border border-[#DDD9CE] rounded-lg"
                  />
                </div>
              </div>

              {/* PRICE + ORIGINAL PRICE */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">
                    Price ($)
                  </label>

                  <input
                    type="number"
                    min="1"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 border border-[#DDD9CE] rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">
                    Original Price ($)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      editingProduct.originalPrice ?? ''
                    }
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: Number(
                          e.target.value
                        ),
                      })
                    }
                    className="w-full p-2.5 border border-[#DDD9CE] rounded-lg"
                  />
                </div>
              </div>

              {/* DISCOUNT + STOCK */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">
                    Discount (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      editingProduct.discount ?? 0
                    }
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discount: Number(
                          e.target.value
                        ),
                      })
                    }
                    className="w-full p-2.5 border border-[#DDD9CE] rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">
                    Stock Units
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 border border-[#DDD9CE] rounded-lg"
                  />
                </div>
              </div>

              {/* SKU */}

              <div>
                <label className="font-bold block mb-1">
                  SKU
                </label>

                <input
                  type="text"
                  value={editingProduct.sku}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sku: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-[#DDD9CE] rounded-lg font-mono"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="font-bold block mb-1">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={
                    editingProduct.description || ''
                  }
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-[#DDD9CE] rounded-lg resize-none"
                />
              </div>

              {/* CURRENT IMAGES */}

              {editingProduct.images?.length > 0 && (
                <div>
                  <label className="font-bold block mb-2">
                    Current Images
                  </label>

                  <div className="grid grid-cols-4 gap-2">
                    {editingProduct.images.map(
                      (image, index) => (
                        <img
                          key={`${image}-${index}`}
                          src={getProductImageUrl(image)}
                          alt={`${editingProduct.name} ${
                            index + 1
                          }`}
                          className="w-full aspect-square object-cover rounded-lg border border-[#DDD9CE]"
                          referrerPolicy="no-referrer"
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* REPLACE IMAGES */}

              <div>
                <label className="font-bold block mb-1">
                  Replace Images
                </label>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(
                      e.target.files || []
                    ).slice(0, 8);

                    setEditProductImages(files);
                  }}
                  className="w-full p-2.5 border border-[#DDD9CE] rounded-lg bg-white"
                />

                <p className="text-[10px] text-[#8C8880] mt-1">
                  Leave empty to keep current images.
                  Selecting new images will replace the
                  existing images.
                </p>

                {editProductImages.length > 0 && (
                  <div className="mt-2 p-2 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg">
                    <p className="font-semibold text-[#1A1A1A] mb-1">
                      {editProductImages.length} new image
                      {editProductImages.length > 1
                        ? 's'
                        : ''}{' '}
                      selected
                    </p>

                    <div className="space-y-1">
                      {editProductImages.map(
                        (file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="text-[10px] text-[#5A5854] truncate"
                          >
                            {index + 1}. {file.name}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* BUTTONS */}

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSavingProduct}
                  className="flex-1 py-2.5 border border-[#DDD9CE] rounded-lg font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingProduct}
                  className="flex-1 py-2.5 bg-[#1A1A1A] text-white rounded-lg font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {isSavingProduct
                    ? 'Saving...'
                    : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;