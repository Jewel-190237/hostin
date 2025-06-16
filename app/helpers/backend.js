import { del, get, patch, post, postForm, patchForm, put, imgDel, newPost } from "./api";

export const sendOtp = (data) => post("/otp/send", data);
export const postRegister = (data) => post("/user/register", data);
export const postLogin = (data) => post("/auth/login", data);
export const postVerifyOtp = (data) => post("/auth/forget-password/verify-otp", data);
export const postResetPassword = (data) => post("/auth/forget-password/submit", data);


export const fetchUser = (data) => get("/user/profile",data);
export const updateUser = (data) => patch("/user/update",data);
export const updatePassword = (data) => put("/update-password",data);
export const changedPassword = (data) => patch("/auth/password-update",data);

// admin users
export const fetchUsers = (data) => get("/user/list?role=user",data);
export const fetchVendor = (data) => get("/user/list?role=vendor",data);


// admin settings
export const fetchSettings = (data) => get("/setting",data);
export const postSettings = (data) => post("/setting",data);
export const fetchEmailSettings = (data) => get("/setting?fields=email_config", data);
export const postEmailSettings = (data) => post("/setting", data);
export const fetchSMSSettings = (data) => get("/setting?fields=phone_config", data);
export const postsSMSSettings = (data) => post("/setting", data);
export const fetchsiteSettings = (data) => get("/setting/site", data);


//translation
export const fetchTranslations = (data) => get("/settings/languages/site", data);
export const fetchAllLanguages = (data) => get("/settings/languages/site", data);
export const fetchAdminLanguages = (data) => get("/settings/languages", data);
export const putLanguage = (data) => put("/settings/languages", data);
export const postLanguage = (data) => post("/settings/languages", data);
export const delLanguage = (data) => del(`/settings/languages/${data._id}`);



// file upload
export const deleteFile = (data) => imgDel("/files/file-remove",data);
export const uploadSingleFile = (data) => postForm("/files/single-image-upload",data);
export const uploadMultipleFile = (data) => postForm("/files/multiple-image-upload",data);

// admin faq

export const fetchFAQ = (data) => get("/faq", data)
export const deleteFAQ = (data) => del(`/faq/${data._id}`)
export const postFAQ = (data) => post(`/faq`, data)
export const updatedFAQ = (data) => put(`/faq`, data)


// admin product category

export const fetchCategory = (data) => get("/product-category", data)
export const createCategory = (data) => post("/product-category/create", data)
export const updateCategory = (data) => patch("/product-category", data)
export const deleteCategory = (data) => del(`/product-category/${data._id}`)


// admin product brand

export const fetchBrand = (data) => get("/product-brand", data)
export const createBrand = (data) => post("/product-brand", data)
export const updateBrand = (data) => patch("/product-brand", data)
export const deleteBrand = (data) => del(`/product-brand/${data._id}`)


// admin product Sections

export const fetchsection = (data) => get("/product-section", data)
export const createsection = (data) => post("/product-section", data)
export const updatesection = (data) => patch("/product-section", data)
export const deletesection = (data) => del(`/product-section/${data._id}`)


// admin product attribute

export const fetchAttribute = (data) => get("/product-attribute", data)
export const createAttribute = (data) => post("/product-attribute", data)
export const updateAttribute = (data) => patch("/product-attribute", data)
export const deleteAttribute = (data) => del(`/product-attribute/${data._id}`)


// admin Coupons


export const fetchCoupons = (data) => get("/product-coupon", data)
export const createCoupons = (data) => post("/product-coupon", data)
export const updateCoupons = (data) => patch("/product-coupon", data)
export const deleteCoupons = (data) => del(`/product-coupon/${data._id}`)

// admin product 

export const fetchVendorProduct = (data) => get("/product?type=vendor&all=yes", data)
export const fetchProduct = (data) => get("/product", data)
export const singleProductAdmin = (data) => get("/product", data)
export const createProduct = (data) => post("/product", data)
export const updateProduct = (data) => patch("/product", data)
export const deleteProduct = (data) => del(`/product/${data._id}`)
export const allVendorProducts = (data) => get("/product?type=vendor&all=yes", data)


// admin Blog Category
export const fetchBlogCategory = (data) => get("/blog-categories", data)
export const createBlogCategory = (data) => post("/blog-categories", data)
export const updateBlogCategory = (data) => patch("/blog-categories", data)
export const deleteBlogCategory = (data) => del(`/blog-categories/${data._id}`)



// admin Blog tag
export const fetchBlogTag = (data) => get("/blog-tags", data)
export const createBlogTag = (data) => post("/blog-tags", data)
export const updateBlogTag = (data) => patch("/blog-tags", data)
export const deleteBlogTag = (data) => del(`/blog-tags/${data._id}`)

// admin blog
export const fetchBlog = (data) => get("/blogs", data)
export const createBlog = (data) => post("/blogs", data)
export const updateBlog = (data) => patch("/blogs", data)
export const deleteBlog = (data) => del(`/blogs/${data._id}`)

// admin Banner
export const fetchBanner = (data) => get("/banner", data)
export const createBanner = (data) => post("/banner", data)
export const updateBanner = (data) => patch("/banner", data)    
export const deleteBanner = (data) => del(`/banner/${data._id}`)
export const fetchpublicBanner = (data) => get("/banner/public?status=true", data)

// public Sections
export const fetchpublicSection = (data) => get("/product/section/home", data)

// public products
export const fetchpublicProducts = (data) => get("/product/site", data)

// contact us
export const contactus = (data) => post("/contact/send", data)
export const fetchContact = (data) => get("/contact", data)
export const replyContact = (data) => post("/contact/send-email", data)
export const deleteContact = (data) => del(`/contact/${data._id}`)


// subscribe
export const fetchSubscribe = (data) => get("/subscriber", data)
export const createSubscribe = (data) => post("/subscriber", data)
export const deleteSubscribe = (data) => del(`/subscriber/${data._id}`)