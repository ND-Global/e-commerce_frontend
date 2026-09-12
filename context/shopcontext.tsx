'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';

import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  User,
  Coupon,
  ToastMessage,
  ProductColor,
  Review,
  Address,
} from '../types';

import { SITE_CONFIG } from '../config/site';

interface ShopContextType {
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  addProduct: (
    product: Omit<Product, 'id'>
  ) => Promise<Product | null>;

  addNewProduct: (
    product: Omit<Product, 'id' | 'images'>,
    files: File[]
  ) => Promise<boolean>;

  updateProduct: (
    id: string,
    product: Partial<Product>,
    imageFiles?: File[]
  ) => Promise<Product | null>;

  updateProductStock: (
    id: string,
    newStock: number
  ) => Promise<void>;

  deleteProduct: (
    id: string
  ) => Promise<void>;

  addReviewToProduct: (
    productId: string,
    review: Omit<Review, 'id' | 'date'>
  ) => Promise<void>;

  cart: CartItem[];

  addToCart: (
    product: Product,
    size: string,
    color: ProductColor,
    quantity?: number
  ) => Promise<boolean>;

  removeFromCart: (
    cartItemId: string
  ) => Promise<void>;

  updateCartQuantity: (
    cartItemId: string,
    quantity: number
  ) => Promise<void>;

  clearCart: () => Promise<void>;

  subtotal: number;
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  shippingCost: number;
  total: number;
  orderTotal: number;
  totalCartItems: number;

  appliedCoupon: Coupon | null;

  applyCoupon: (
    code: string
  ) => Promise<boolean | { success: boolean; message: string }>;

  removeCoupon: () => void;

  coupons: Coupon[];

  addCoupon: (
    coupon: Coupon
  ) => Promise<void>;

  addNewCoupon: (
    coupon: Coupon
  ) => Promise<void>;

  toggleCouponStatus: (
    code: string
  ) => Promise<void>;

  wishlist: string[];

  isInWishlist: (
    productId: string
  ) => boolean;

  toggleWishlist: (
    productId: string
  ) => void;

  removeFromWishlist: (
    productId: string
  ) => void;

  moveToCartFromWishlist: (
    product: Product,
    size?: string,
    color?: ProductColor
  ) => Promise<void>;

  orders: Order[];

  createOrder: (
    orderData: {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      shippingAddress: Address;
      paymentMethod: any;
    }
  ) => Promise<Order | null>;

  placeOrder: (
    shippingAddress: Address,
    paymentMethod: any
  ) => Promise<Order | null>;

  updateOrderStatus: (
    orderId: string,
    status: OrderStatus
  ) => Promise<void>;

  getOrderById: (
    orderId: string
  ) => Order | undefined;

  lastCreatedOrder: Order | null;

  user: User | null;
  currentUser: User | null;
  isAuthenticated: boolean;

  login: (
    email: string,
    password?: string
  ) => Promise<boolean>;

  signup: (
    name: string,
    email: string,
    password?: string,
    phone?: string
  ) => Promise<boolean>;

  logout: () => void;

  updateUserProfile: (
    user: Partial<User>
  ) => Promise<void>;

  addSavedAddress: (
    address: Address
  ) => Promise<void>;

  removeSavedAddress: (
    index: number
  ) => Promise<void>;

  toasts: ToastMessage[];

  addToast: (
    title: string,
    message?: string,
    type?: 'success' | 'error' | 'info'
  ) => void;

  removeToast: (
    id: string
  ) => void;

  quickViewProduct: Product | null;

  setQuickViewProduct: (
    product: Product | null
  ) => void;

  sizeGuideOpen: boolean;

  setSizeGuideOpen: (
    open: boolean
  ) => void;

  cartDrawerOpen: boolean;

  setCartDrawerOpen: (
    open: boolean
  ) => void;

  searchModalOpen: boolean;

  setSearchModalOpen: (
    open: boolean
  ) => void;

  mobileMenuOpen: boolean;

  setMobileMenuOpen: (
    open: boolean
  ) => void;

  currentPath: string;

  navigate: (
    path: string
  ) => void;
}

const ShopContext =
  createContext<ShopContextType | undefined>(
    undefined
  );

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:7000/api';

const apiFetch = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  const isFormData =
    options.body instanceof FormData;

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        ...(isFormData
          ? {}
          : {
              'Content-Type':
                'application/json',
            }),

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    }
  );

  const data =
    await response
      .json()
      .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        'Something went wrong'
    );
  }

  return data;
};

export const ShopProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  const [currentPath, setCurrentPath] =
    useState('/');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setCurrentPath(
      window.location.pathname || '/'
    );

    const handlePopState = () => {
      setCurrentPath(
        window.location.pathname || '/'
      );
    };

    window.addEventListener(
      'popstate',
      handlePopState
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      );
    };
  }, []);

  const navigate = (path: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.history.pushState(
      {},
      '',
      path
    );

    setCurrentPath(path);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // --------------------------------------------------
  // Toast
  // --------------------------------------------------

  const [toasts, setToasts] =
    useState<ToastMessage[]>([]);

  const addToast = (
    title: string,
    message?: string,
    type:
      | 'success'
      | 'error'
      | 'info' = 'success'
  ) => {
    const id = Math.random()
      .toString(36)
      .substring(2, 9);

    const newToast: ToastMessage = {
      id,
      title,
      message,
      type,
    };

    setToasts((prev) => [
      ...prev,
      newToast,
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter(
          (toast) => toast.id !== id
        )
      );
    }, 4000);
  };

  const removeToast = (
    id: string
  ) => {
    setToasts((prev) =>
      prev.filter(
        (toast) => toast.id !== id
      )
    );
  };

  // --------------------------------------------------
  // Products
  // --------------------------------------------------

  const [products, setProducts] =
    useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response: any =
          await apiFetch('/products');

        const data =
          response?.products ||
          response?.data ||
          response;

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          'Products loading error:',
          error
        );

        addToast(
          'Products Error',
          'Unable to load products.',
          'error'
        );
      }
    };

    loadProducts();
  }, []);

  const getProductBySlug = (
    slug: string
  ) => {
    return products.find(
      (product) =>
        product.slug === slug ||
        product.id === slug
    );
  };

  const getProductById = (
    id: string
  ) => {
    return products.find(
      (product) =>
        product.id === id
    );
  };

  const addProduct = async (
    productData: Omit<Product, 'id'>
  ): Promise<Product | null> => {
    try {
      const response: any =
        await apiFetch(
          '/products',
          {
            method: 'POST',
            body: JSON.stringify(
              productData
            ),
          }
        );

      const product =
        response?.product ||
        response?.data ||
        response;

      setProducts((prev) => [
        product,
        ...prev,
      ]);

      addToast(
        'Product Added',
        `${product.name} created successfully.`
      );

      return product;
    } catch (error: any) {
      addToast(
        'Product Error',
        error.message ||
          'Unable to create product.',
        'error'
      );

      return null;
    }
  };

  const updateProduct = async (
    id: string,
    updatedFields: Partial<Product>,
    imageFiles?: File[]
  ) => {
    try {
      const formData =
        new FormData();

      Object.entries(
        updatedFields
      ).forEach(
        ([key, value]) => {
          if (
            value === undefined ||
            value === null
          ) {
            return;
          }

          if (
            [
              'details',
              'sizes',
              'colors',
            ].includes(key) &&
            typeof value !==
              'string'
          ) {
            formData.append(
              key,
              JSON.stringify(value)
            );
          } else {
            formData.append(
              key,
              String(value)
            );
          }
        }
      );

      imageFiles?.forEach(
        (file) => {
          formData.append(
            'images',
            file
          );
        }
      );

      const response: any =
        await apiFetch(
          `/products/${id}`,
          {
            method: 'PUT',
            body: formData,
          }
        );

      const updatedProduct =
        response?.product ||
        response?.data ||
        response;

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? updatedProduct
            : product
        )
      );

      addToast(
        'Product Updated',
        'Changes saved successfully.'
      );

      return updatedProduct;
    } catch (error: any) {
      addToast(
        'Update Failed',
        error.message ||
          'Unable to update product.',
        'error'
      );

      return null;
    }
  };

  const updateProductStock =
    async (
      id: string,
      newStock: number
    ) => {
      try {
        const response: any =
          await apiFetch(
            `/products/${id}/stock`,
            {
              method: 'PATCH',
              body: JSON.stringify({
                stock: newStock,
              }),
            }
          );

        const updatedProduct =
          response?.product ||
          response?.data ||
          response;

        setProducts((prev) =>
          prev.map((product) =>
            product.id === id
              ? {
                  ...product,
                  ...updatedProduct,
                  stock: newStock,
                }
              : product
          )
        );

        addToast(
          'Stock Adjusted',
          `Inventory updated to ${newStock} units.`
        );
      } catch (error: any) {
        addToast(
          'Stock Update Failed',
          error.message ||
            'Unable to update stock.',
          'error'
        );
      }
    };

  const deleteProduct = async (
    id: string
  ) => {
    try {
      await apiFetch(
        `/products/${id}`,
        {
          method: 'DELETE',
        }
      );

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !== id
        )
      );

      addToast(
        'Product Removed',
        'Product deleted from catalog.',
        'info'
      );
    } catch (error: any) {
      addToast(
        'Delete Failed',
        error.message ||
          'Unable to delete product.',
        'error'
      );
    }
  };

  const addReviewToProduct =
    async (
      productId: string,
      reviewData: Omit<
        Review,
        'id' | 'date'
      >
    ) => {
      try {
        await apiFetch(
          `/products/${productId}/reviews`,
          {
            method: 'POST',
            body: JSON.stringify(
              reviewData
            ),
          }
        );

        const response: any =
          await apiFetch(
            `/products/${productId}`
          );

        const updatedProduct =
          response?.product ||
          response?.data ||
          response;

        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? updatedProduct
              : product
          )
        );

        addToast(
          'Review Submitted',
          'Thank you for sharing your experience!'
        );
      } catch (error: any) {
        addToast(
          'Review Failed',
          error.message ||
            'Unable to submit review.',
          'error'
        );
      }
    };

  const addNewProduct = async (
    productData: Omit<
      Product,
      'id' | 'images'
    >,
    files: File[]
  ): Promise<boolean> => {
    try {
      if (!files.length) {
        throw new Error(
          'At least one product image is required.'
        );
      }

      const formData =
        new FormData();

      formData.append(
        'name',
        productData.name
      );

      formData.append(
        'slug',
        productData.slug || ''
      );

      formData.append(
        'category',
        productData.category
      );

      formData.append(
        'gender',
        productData.gender
      );

      formData.append(
        'price',
        String(productData.price)
      );

      formData.append(
        'originalPrice',
        String(
          productData.originalPrice
        )
      );

      formData.append(
        'discount',
        String(
          productData.discount
        )
      );

      formData.append(
        'description',
        productData.description
      );

      formData.append(
        'stock',
        String(productData.stock)
      );

      formData.append(
        'sku',
        productData.sku
      );

      formData.append(
        'sizes',
        JSON.stringify(
          productData.sizes || []
        )
      );

      formData.append(
        'colors',
        JSON.stringify(
          productData.colors || []
        )
      );

      if (productData.details) {
        formData.append(
          'details',
          JSON.stringify(
            productData.details
          )
        );
      }

      if (
        productData.rating !==
        undefined
      ) {
        formData.append(
          'rating',
          String(
            productData.rating
          )
        );
      }

      if (
        productData.reviewsCount !==
        undefined
      ) {
        formData.append(
          'reviewsCount',
          String(
            productData.reviewsCount
          )
        );
      }

      if (
        productData.isNewArrival !==
        undefined
      ) {
        formData.append(
          'isNewArrival',
          String(
            productData.isNewArrival
          )
        );
      }

      if (
        productData.isTrending !==
        undefined
      ) {
        formData.append(
          'isTrending',
          String(
            productData.isTrending
          )
        );
      }

      if (
        productData.isSale !==
        undefined
      ) {
        formData.append(
          'isSale',
          String(
            productData.isSale
          )
        );
      }

      if (productData.material) {
        formData.append(
          'material',
          productData.material
        );
      }

      if (productData.fit) {
        formData.append(
          'fit',
          productData.fit
        );
      }

      if (
        productData.careInstructions
      ) {
        formData.append(
          'careInstructions',
          productData.careInstructions
        );
      }

      files
        .slice(0, 8)
        .forEach((file) => {
          formData.append(
            'images',
            file
          );
        });

      const response: any =
        await apiFetch(
          '/products',
          {
            method: 'POST',
            body: formData,
          }
        );

      const createdProduct =
        response?.product ||
        response?.data ||
        response;

      setProducts((prev) => [
        createdProduct,
        ...prev,
      ]);

      addToast(
        'Product Added',
        'Product and images uploaded successfully.'
      );

      return true;
    } catch (error: any) {
      addToast(
        'Product Creation Failed',
        error.message ||
          'Unable to create product.',
        'error'
      );

      return false;
    }
  };

  // --------------------------------------------------
  // Cart
  // --------------------------------------------------

  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [cartLoading, setCartLoading] =
    useState(false);

  const mapBackendCart = (
    backendCart: any
  ): CartItem[] => {
    const items =
      Array.isArray(
        backendCart?.items
      )
        ? backendCart.items
        : [];

    return items
      .map((item: any) => {
        const productData =
          item.productId;

        if (!productData) {
          return null;
        }

        const product: Product = {
          ...productData,

          id:
            productData.id ||
            productData._id ||
            item.productId?._id,
        };

        const size =
          item.size || '';

        const color =
          item.color || {
            name: 'Default',
            hex: '#000000',
          };

        return {
          id:
            item.id ||
            item._id ||
            `${product.id}-${size}-${color.name}`,

          productId: product.id,

          product,

          size,

          selectedSize: size,

          color,

          selectedColor: color,

          quantity: Number(
            item.quantity || 1
          ),
        };
      })
      .filter(Boolean) as CartItem[];
  };

  useEffect(() => {
    const loadCart = async () => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem(
              'token'
            )
          : null;

      if (!token) {
        setCart([]);
        return;
      }

      setCartLoading(true);

      try {
        const response: any =
          await apiFetch('/cart');

        const backendCart =
          response?.cart ||
          response?.data ||
          response;

        setCart(
          mapBackendCart(
            backendCart
          )
        );
      } catch (error: any) {
        console.error(
          'Cart loading error:',
          error
        );

        setCart([]);
      } finally {
        setCartLoading(false);
      }
    };

    loadCart();
  }, [currentUser]);

  const addToCart = async (
    product: Product,
    size: string,
    color: ProductColor,
    quantity = 1
  ): Promise<boolean> => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem(
            'token'
          )
        : null;

    if (!token) {
      addToast(
        'Login Required',
        'Please login before adding products to your cart.',
        'error'
      );

      navigate('/login');

      return false;
    }

    if (quantity < 1) {
      return false;
    }

    if (quantity > product.stock) {
      addToast(
        'Stock Limit Reached',
        `Only ${product.stock} units available in stock.`,
        'error'
      );

      return false;
    }

    try {
      const response: any =
        await apiFetch(
          '/cart/items',
          {
            method: 'POST',
            body: JSON.stringify({
              productId:
                product.id,
              size,
              color,
              quantity,
            }),
          }
        );

      const backendCart =
        response?.cart ||
        response?.data ||
        response;

      setCart(
        mapBackendCart(
          backendCart
        )
      );

      addToast(
        'Added to Bag',
        `${quantity}x ${product.name} (${size} · ${color.name}) added.`
      );

      return true;
    } catch (error: any) {
      addToast(
        'Cart Error',
        error.message ||
          'Unable to add product to cart.',
        'error'
      );

      return false;
    }
  };

  const removeFromCart =
    async (
      cartItemId: string
    ) => {
      try {
        const response: any =
          await apiFetch(
            `/cart/items/${cartItemId}`,
            {
              method: 'DELETE',
            }
          );

        const backendCart =
          response?.cart ||
          response?.data ||
          response;

        setCart(
          mapBackendCart(
            backendCart
          )
        );

        addToast(
          'Item Removed',
          'Item removed from your shopping bag.',
          'info'
        );
      } catch (error: any) {
        addToast(
          'Remove Failed',
          error.message ||
            'Unable to remove item from cart.',
          'error'
        );
      }
    };

  const updateCartQuantity =
    async (
      cartItemId: string,
      newQty: number
    ) => {
      if (newQty <= 0) {
        await removeFromCart(
          cartItemId
        );

        return;
      }

      const item = cart.find(
        (cartItem) =>
          cartItem.id ===
          cartItemId
      );

      if (!item) {
        return;
      }

      if (
        newQty >
        item.product.stock
      ) {
        addToast(
          'Stock Limit',
          `Maximum available is ${item.product.stock}`,
          'error'
        );

        return;
      }

      try {
        const response: any =
          await apiFetch(
            `/cart/items/${cartItemId}`,
            {
              method: 'PATCH',
              body: JSON.stringify({
                quantity: newQty,
              }),
            }
          );

        const backendCart =
          response?.cart ||
          response?.data ||
          response;

        setCart(
          mapBackendCart(
            backendCart
          )
        );
      } catch (error: any) {
        addToast(
          'Quantity Update Failed',
          error.message ||
            'Unable to update cart quantity.',
          'error'
        );
      }
    };

  const clearCart = async () => {
    try {
      await apiFetch(
        '/cart',
        {
          method: 'DELETE',
        }
      );

      setCart([]);

      setAppliedCoupon(null);

      addToast(
        'Cart Cleared',
        'All items have been removed from your cart.',
        'info'
      );
    } catch (error: any) {
      addToast(
        'Clear Cart Failed',
        error.message ||
          'Unable to clear your cart.',
        'error'
      );
    }
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        Number(
          item.product.price
        ) *
          item.quantity,
      0
    );
  }, [cart]);

  // --------------------------------------------------
  // Coupon Calculation
  // --------------------------------------------------

  const [
    appliedCoupon,
    setAppliedCoupon,
  ] = useState<Coupon | null>(
    null
  );

  const discountAmount =
    useMemo(() => {
      if (!appliedCoupon) {
        return 0;
      }

      const percentage =
        Number(
          appliedCoupon.discountPercentage ??
            appliedCoupon.discountPercent ??
            0
        );

      return (
        (subtotal *
          percentage) /
        100
      );
    }, [
      subtotal,
      appliedCoupon,
    ]);

  const shippingFee =
    useMemo(() => {
      if (cart.length === 0) {
        return 0;
      }

      return subtotal >=
        SITE_CONFIG.shipping
          .freeShippingThreshold
        ? 0
        : SITE_CONFIG.shipping
            .standardShippingFee;
    }, [
      subtotal,
      cart.length,
    ]);

  const total = useMemo(() => {
    return Math.max(
      0,
      subtotal -
        discountAmount +
        shippingFee
    );
  }, [
    subtotal,
    discountAmount,
    shippingFee,
  ]);

  const totalCartItems =
    useMemo(() => {
      return cart.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );
    }, [cart]);

  // --------------------------------------------------
  // Coupons
  // --------------------------------------------------

  const [coupons, setCoupons] =
    useState<Coupon[]>([]);

  const applyCoupon = async (
    code: string
  ): Promise<boolean> => {
    try {
      const response: any =
        await apiFetch(
          '/coupons/validate',
          {
            method: 'POST',
            body: JSON.stringify({
              code: code
                .trim()
                .toUpperCase(),
              cartTotal: subtotal,
            }),
          }
        );

      const coupon =
        response?.coupon ||
        response?.data ||
        response;

      setAppliedCoupon(
        coupon
      );

      const percentage =
        Number(
          coupon.discountPercentage ??
            coupon.discountPercent ??
            0
        );

      addToast(
        'Coupon Applied',
        `${percentage}% discount applied to your order!`
      );

      return true;
    } catch (error: any) {
      addToast(
        'Invalid Coupon',
        error.message ||
          'Coupon is not valid.',
        'error'
      );

      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);

    addToast(
      'Coupon Removed',
      'Coupon discount has been removed.',
      'info'
    );
  };

  const addCoupon = async (
    coupon: Coupon
  ) => {
    try {
      const response: any =
        await apiFetch(
          '/coupons',
          {
            method: 'POST',
            body: JSON.stringify(
              coupon
            ),
          }
        );

      const createdCoupon =
        response?.coupon ||
        response?.data ||
        response;

      setCoupons((prev) => [
        ...prev,
        createdCoupon,
      ]);

      addToast(
        'Coupon Created',
        `Code ${createdCoupon.code} is now active.`
      );
    } catch (error: any) {
      addToast(
        'Coupon Error',
        error.message ||
          'Unable to create coupon.',
        'error'
      );
    }
  };

  const toggleCouponStatus =
    async (
      code: string
    ) => {
      try {
        await apiFetch(
          `/coupons/${code}/toggle`,
          {
            method: 'PATCH',
          }
        );

        setCoupons((prev) =>
          prev.map((coupon) =>
            coupon.code === code
              ? {
                  ...coupon,
                  isActive:
                    !coupon.isActive,
                }
              : coupon
          )
        );
      } catch (error: any) {
        addToast(
          'Coupon Error',
          error.message ||
            'Unable to update coupon.',
          'error'
        );
      }
    };

  // --------------------------------------------------
  // Wishlist
  // --------------------------------------------------

  const [wishlist, setWishlist] =
    useState<string[]>([]);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          'velora_wishlist_v2'
        );

      if (saved) {
        setWishlist(
          JSON.parse(saved)
        );
      }
    } catch (error) {
      console.error(
        'Wishlist loading error:',
        error
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'velora_wishlist_v2',
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const isInWishlist = (
    productId: string
  ) => {
    return wishlist.includes(
      productId
    );
  };

  const toggleWishlist = (
    productId: string
  ) => {
    const product =
      getProductById(productId);

    if (
      isInWishlist(productId)
    ) {
      setWishlist((prev) =>
        prev.filter(
          (id) =>
            id !== productId
        )
      );

      addToast(
        'Removed from Wishlist',
        product
          ? `${product.name} removed.`
          : 'Removed.',
        'info'
      );
    } else {
      setWishlist((prev) => [
        ...prev,
        productId,
      ]);

      addToast(
        'Saved to Wishlist',
        product
          ? `${product.name} added to your wishlist.`
          : 'Added.'
      );
    }
  };

  const removeFromWishlist = (
    productId: string
  ) => {
    setWishlist((prev) =>
      prev.filter(
        (id) =>
          id !== productId
      )
    );

    addToast(
      'Removed from Wishlist',
      'Item removed.',
      'info'
    );
  };

  const moveToCartFromWishlist =
    async (
      product: Product,
      size?: string,
      color?: ProductColor
    ): Promise<void> => {
      const selectedSize =
        size ||
        product.sizes?.[0] ||
        'M';

      const selectedColor =
        color ||
        product.colors?.[0] || {
          name: 'Default',
          hex: '#000000',
        };

      const success =
        await addToCart(
          product,
          selectedSize,
          selectedColor,
          1
        );

      if (success) {
        removeFromWishlist(
          product.id
        );
      }
    };

  // --------------------------------------------------
  // Orders
  // --------------------------------------------------

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [
    lastCreatedOrder,
    setLastCreatedOrder,
  ] = useState<Order | null>(
    null
  );

  const createOrder = async (
    orderData: {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      shippingAddress: Address;
      paymentMethod: any;
    }
  ): Promise<Order | null> => {
    try {
      const response: any =
        await apiFetch(
          '/orders',
          {
            method: 'POST',
            body: JSON.stringify({
              customerName:
                orderData.customerName,

              customerEmail:
                orderData.customerEmail,

              customerPhone:
                orderData.customerPhone,

              shippingAddress:
                orderData.shippingAddress,

              paymentMethod:
                orderData.paymentMethod,

              items: cart.map(
                (item) => ({
                  productId:
                    item.productId,

                  quantity:
                    item.quantity,

                  size:
                    item.selectedSize ||
                    item.size,

                  color:
                    item.selectedColor ||
                    item.color,
                })
              ),

              couponCode:
                appliedCoupon?.code,
            }),
          }
        );

      const order =
        response?.order ||
        response?.data ||
        response;

      setOrders((prev) => [
        order,
        ...prev,
      ]);

      setLastCreatedOrder(
        order
      );

      await clearCart();

      addToast(
        'Order Placed',
        'Your order has been placed successfully.'
      );

      return order;
    } catch (error: any) {
      addToast(
        'Order Failed',
        error.message ||
          'Unable to place order.',
        'error'
      );

      return null;
    }
  };

  const placeOrder = async (
    shippingAddress: Address,
    paymentMethod: any
  ) => {
    return createOrder({
      customerName:
        shippingAddress.fullName,

      customerEmail:
        shippingAddress.email ||
        currentUser?.email ||
        '',

      customerPhone:
        shippingAddress.phone,

      shippingAddress,

      paymentMethod,
    });
  };

  const updateOrderStatus =
    async (
      orderId: string,
      status: OrderStatus
    ) => {
      try {
        const response: any =
          await apiFetch(
            `/orders/${orderId}/status`,
            {
              method: 'PATCH',
              body: JSON.stringify({
                status,
              }),
            }
          );

        const updatedOrder =
          response?.order ||
          response?.data ||
          response;

        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? updatedOrder
              : order
          )
        );

        addToast(
          'Status Updated',
          `Order #${orderId} status set to ${status}.`
        );
      } catch (error: any) {
        addToast(
          'Update Failed',
          error.message ||
            'Unable to update order.',
          'error'
        );
      }
    };

  const getOrderById = (
    orderId: string
  ) => {
    return orders.find(
      (order) =>
        order.id === orderId
    );
  };

  // --------------------------------------------------
  // Auth
  // --------------------------------------------------

  useEffect(() => {
    const token =
      localStorage.getItem(
        'token'
      );

    if (!token) {
      return;
    }

    const loadUser =
      async () => {
        try {
          const response: any =
            await apiFetch(
              '/auth/me'
            );

          const user =
            response?.user ||
            response?.data ||
            response;

          setCurrentUser(user);
        } catch (error) {
          localStorage.removeItem(
            'token'
          );

          setCurrentUser(null);
        }
      };

    loadUser();
  }, []);

  const login = async (
    email: string,
    password?: string
  ): Promise<boolean> => {
    try {
      const response: any =
        await apiFetch(
          '/auth/login',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const token =
        response?.token ||
        response?.data?.token;

      const user =
        response?.user ||
        response?.data?.user;

      if (!token) {
        throw new Error(
          'Login token not received.'
        );
      }

      localStorage.setItem(
        'token',
        token
      );

      setCurrentUser(user);

      addToast(
        'Welcome Back',
        `Signed in as ${
          user?.name || email
        }`
      );

      return true;
    } catch (error: any) {
      addToast(
        'Login Failed',
        error.message ||
          'Invalid email or password.',
        'error'
      );

      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password?: string,
    phone?: string
  ): Promise<boolean> => {
    try {
      const response: any =
        await apiFetch(
          '/auth/register',
          {
            method: 'POST',
            body: JSON.stringify({
              name,
              email,
              password,
              phone,
            }),
          }
        );

      const token =
        response?.token ||
        response?.data?.token;

      const user =
        response?.user ||
        response?.data?.user;

      if (token) {
        localStorage.setItem(
          'token',
          token
        );
      }

      if (user) {
        setCurrentUser(user);
      }

      addToast(
        'Account Created',
        `Welcome to VELORA, ${name}!`
      );

      return true;
    } catch (error: any) {
      addToast(
        'Signup Failed',
        error.message ||
          'Unable to create account.',
        'error'
      );

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(
      'token'
    );

    setCurrentUser(null);

    addToast(
      'Signed Out',
      'You have been logged out.',
      'info'
    );
  };

  const updateUserProfile =
    async (
      updated: Partial<User>
    ) => {
      if (!currentUser) {
        return;
      }

      try {
        setCurrentUser(
          (prev) =>
            prev
              ? {
                  ...prev,
                  ...updated,
                }
              : null
        );

        addToast(
          'Profile Updated',
          'Your details have been saved.'
        );
      } catch (error: any) {
        addToast(
          'Update Failed',
          error.message ||
            'Unable to update profile.',
          'error'
        );
      }
    };

  const addSavedAddress =
    async (
      address: Address
    ) => {
      if (!currentUser) {
        return;
      }

      const addresses = [
        ...(currentUser.savedAddresses ||
          []),
        address,
      ];

      await updateUserProfile({
        savedAddresses:
          addresses,
      });

      addToast(
        'Address Saved',
        `${address.city}, ${address.state} added.`
      );
    };

  const removeSavedAddress =
    async (
      index: number
    ) => {
      if (!currentUser) {
        return;
      }

      const addresses = (
        currentUser.savedAddresses ||
        []
      ).filter(
        (_, i) =>
          i !== index
      );

      await updateUserProfile({
        savedAddresses:
          addresses,
      });

      addToast(
        'Address Removed',
        'Address removed from your profile.',
        'info'
      );
    };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  const [
    quickViewProduct,
    setQuickViewProduct,
  ] = useState<Product | null>(
    null
  );

  const [
    sizeGuideOpen,
    setSizeGuideOpen,
  ] = useState(false);

  const [
    cartDrawerOpen,
    setCartDrawerOpen,
  ] = useState(false);

  const [
    searchModalOpen,
    setSearchModalOpen,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  // --------------------------------------------------
  // Provider
  // --------------------------------------------------

  return (
    <ShopContext.Provider
      value={{
        products,

        getProductBySlug,
        getProductById,

        addProduct,
        addNewProduct,
        updateProduct,
        updateProductStock,
        deleteProduct,
        addReviewToProduct,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        subtotal,
        cartSubtotal: subtotal,
        discountAmount,
        shippingFee,
        shippingCost: shippingFee,
        total,
        orderTotal: total,
        totalCartItems,

        appliedCoupon,
        applyCoupon,
        removeCoupon,
        coupons,
        addCoupon,
        addNewCoupon: addCoupon,
        toggleCouponStatus,

        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCartFromWishlist,

        orders,
        createOrder,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        lastCreatedOrder,

        user: currentUser,
        currentUser,
        isAuthenticated:
          !!currentUser,

        login,
        signup,
        logout,
        updateUserProfile,
        addSavedAddress,
        removeSavedAddress,

        toasts,
        addToast,
        removeToast,

        quickViewProduct,
        setQuickViewProduct,

        sizeGuideOpen,
        setSizeGuideOpen,

        cartDrawerOpen,
        setCartDrawerOpen,

        searchModalOpen,
        setSearchModalOpen,

        mobileMenuOpen,
        setMobileMenuOpen,

        currentPath,
        navigate,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context =
    useContext(ShopContext);

  if (!context) {
    throw new Error(
      'useShop must be used within a ShopProvider'
    );
  }

  return context;
};
