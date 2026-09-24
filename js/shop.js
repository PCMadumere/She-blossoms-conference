// =========================================================
// SHE BLOSSOMS SHOP
// CART + WHATSAPP ORDER SYSTEM
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =================================================
        // CONFIGURATION
        // =================================================

        const MERCHANDISE_WHATSAPP =
            "2348081816585";


        // =================================================
        // ELEMENTS
        // =================================================

        const cartList =
            document.getElementById(
                "cart-list"
            );

        const cartEmpty =
            document.getElementById(
                "cart-empty"
            );

        const cartTotalElement =
            document.getElementById(
                "cart-total"
            );

        const cartItemLabel =
            document.getElementById(
                "cart-item-label"
            );

        const cartCount =
            document.getElementById(
                "shop-cart-count"
            );

        const orderForm =
            document.getElementById(
                "order-form"
            );

        const navCartButton =
            document.getElementById(
                "nav-cart-button"
            );

        const orderSection =
            document.getElementById(
                "order-section"
            );

        const mobileMenuButton =
            document.getElementById(
                "mobile-menu-button"
            );

        const navigation =
            document.getElementById(
                "shop-navigation"
            );


        // =================================================
        // CART
        // =================================================

        let cart = [];


        // =================================================
        // FORMAT CURRENCY
        // =================================================

        function formatNaira(
            amount
        ) {

            return (
                "₦" +
                Number(amount)
                    .toLocaleString(
                        "en-NG"
                    )
            );

        }


        // =================================================
        // GET TOTAL
        // =================================================

        function getCartTotal() {

            return cart.reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        item.price *
                        item.quantity
                    );

                },
                0
            );

        }


        // =================================================
        // GET ITEM COUNT
        // =================================================

        function getCartCount() {

            return cart.reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        item.quantity
                    );

                },
                0
            );

        }


        // =================================================
        // RENDER CART
        // =================================================

        function renderCart() {

            const total =
                getCartTotal();

            const count =
                getCartCount();


            // ---------------------------------------------
            // CART COUNT
            // ---------------------------------------------

            if (cartCount) {

                cartCount.textContent =
                    count;

                cartCount.hidden =
                    count === 0;

            }


            // ---------------------------------------------
            // ITEM LABEL
            // ---------------------------------------------

            if (cartItemLabel) {

                cartItemLabel.textContent =
                    count === 1
                        ? "1 item"
                        : `${count} items`;

            }


            // ---------------------------------------------
            // EMPTY CART
            // ---------------------------------------------

            if (!cart.length) {

                cartList.innerHTML = "";

                cartEmpty.hidden =
                    false;

            }


            // ---------------------------------------------
            // CART ITEMS
            // ---------------------------------------------

            else {

                cartEmpty.hidden =
                    true;


                cartList.innerHTML =
                    cart.map(
                        function (
                            item,
                            index
                        ) {

                            return `

                                <li class="cart-line">

                                    <div>

                                        <span
                                            class="cart-item-name"
                                        >
                                            ${escapeHTML(
                                                item.name
                                            )}
                                        </span>

                                        <span
                                            class="cart-item-meta"
                                        >
                                            Size:
                                            ${escapeHTML(
                                                item.size
                                            )}
                                        </span>


                                        <div
                                            class="cart-item-controls"
                                        >

                                            <button
                                                type="button"
                                                class="quantity-button"
                                                data-action="decrease"
                                                data-index="${index}"
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>


                                            <span
                                                class="quantity-value"
                                            >
                                                ${item.quantity}
                                            </span>


                                            <button
                                                type="button"
                                                class="quantity-button"
                                                data-action="increase"
                                                data-index="${index}"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>


                                            <button
                                                type="button"
                                                class="remove-item"
                                                data-action="remove"
                                                data-index="${index}"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>


                                    <strong>

                                        ${formatNaira(
                                            item.price *
                                            item.quantity
                                        )}

                                    </strong>

                                </li>

                            `;

                        }
                    ).join("");

            }


            // ---------------------------------------------
            // TOTAL
            // ---------------------------------------------

            cartTotalElement.textContent =
                formatNaira(
                    total
                );

        }


        // =================================================
        // ESCAPE HTML
        // =================================================

        function escapeHTML(
            value
        ) {

            return String(value)
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }


        // =================================================
        // ADD TO CART
        // =================================================

        document
            .querySelectorAll(
                ".add-to-cart"
            )
            .forEach(
                function (
                    button
                ) {

                    button.addEventListener(
                        "click",
                        function () {


                            const product =
                                button.closest(
                                    ".product-card"
                                );


                            const size =
                                product
                                    .querySelector(
                                        ".product-size"
                                    )
                                    .value;


                            const name =
                                button.dataset.name;


                            const price =
                                Number(
                                    button.dataset.price
                                );


                            // --------------------------------
                            // FIND EXISTING ITEM
                            // --------------------------------

                            const existing =
                                cart.find(
                                    function (
                                        item
                                    ) {

                                        return (
                                            item.name ===
                                                name &&
                                            item.size ===
                                                size
                                        );

                                    }
                                );


                            // --------------------------------
                            // ADD / INCREASE
                            // --------------------------------

                            if (existing) {

                                existing.quantity +=
                                    1;

                            }

                            else {

                                cart.push({

                                    name:
                                        name,

                                    price:
                                        price,

                                    size:
                                        size,

                                    quantity:
                                        1

                                });

                            }


                            // --------------------------------
                            // UPDATE CART
                            // --------------------------------

                            renderCart();


                            // --------------------------------
                            // BUTTON FEEDBACK
                            // --------------------------------

                            const originalText =
                                button.textContent;


                            button.textContent =
                                "Added ✓";


                            button.disabled =
                                true;


                            setTimeout(
                                function () {

                                    button.textContent =
                                        originalText;

                                    button.disabled =
                                        false;

                                },
                                900
                            );


                            // --------------------------------
                            // SCROLL TO ORDER
                            // --------------------------------

                            orderSection.scrollIntoView({

                                behavior:
                                    "smooth",

                                block:
                                    "start"

                            });

                        }
                    );

                }
            );


        // =================================================
        // CART CONTROLS
        // =================================================

        cartList.addEventListener(
            "click",
            function (
                event
            ) {


                const button =
                    event.target.closest(
                        "button[data-action]"
                    );


                if (!button) {

                    return;

                }


                const index =
                    Number(
                        button.dataset.index
                    );


                const action =
                    button.dataset.action;


                if (!cart[index]) {

                    return;

                }


                // -----------------------------------------
                // INCREASE
                // -----------------------------------------

                if (
                    action ===
                    "increase"
                ) {

                    cart[index].quantity +=
                        1;

                }


                // -----------------------------------------
                // DECREASE
                // -----------------------------------------

                if (
                    action ===
                    "decrease"
                ) {

                    cart[index].quantity -=
                        1;


                    if (
                        cart[index].quantity <=
                        0
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                    }

                }


                // -----------------------------------------
                // REMOVE
                // -----------------------------------------

                if (
                    action ===
                    "remove"
                ) {

                    cart.splice(
                        index,
                        1
                    );

                }


                renderCart();

            }
        );


        // =================================================
        // CART NAVIGATION BUTTON
        // =================================================

        if (navCartButton) {

            navCartButton.addEventListener(
                "click",
                function () {

                    orderSection.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        }


        // =================================================
        // ORDER FORM
        // =================================================

        orderForm.addEventListener(
            "submit",
            function (
                event
            ) {

                event.preventDefault();


                // -----------------------------------------
                // CHECK CART
                // -----------------------------------------

                if (!cart.length) {

                    alert(
                        "Please add at least one item to your cart."
                    );

                    return;

                }


                // -----------------------------------------
                // GET FORM DATA
                // -----------------------------------------

                const formData =
                    new FormData(
                        orderForm
                    );


                const name =
                    String(
                        formData.get(
                            "name"
                        ) || ""
                    ).trim();


                const phone =
                    String(
                        formData.get(
                            "phone"
                        ) || ""
                    ).trim();


                const payment =
                    String(
                        formData.get(
                            "payment"
                        ) || ""
                    );


                // -----------------------------------------
                // VALIDATION
                // -----------------------------------------

                if (
                    !name ||
                    !phone
                ) {

                    alert(
                        "Please enter your name and phone number."
                    );

                    return;

                }


                // -----------------------------------------
                // CREATE ORDER ITEMS
                // -----------------------------------------

                const orderLines =
                    cart.map(
                        function (
                            item
                        ) {

                            return (
                                "• " +
                                item.name +
                                " | Size: " +
                                item.size +
                                " | Qty: " +
                                item.quantity +
                                " | " +
                                formatNaira(
                                    item.price *
                                    item.quantity
                                )
                            );

                        }
                    );


                // -----------------------------------------
                // TOTAL
                // -----------------------------------------

                const total =
                    getCartTotal();


                // -----------------------------------------
                // WHATSAPP MESSAGE
                // -----------------------------------------

                const message = [

                    "Hello She Blossoms merchandise team.",

                    "",

                    "I would like to place an order.",

                    "",

                    ...orderLines,

                    "",

                    "Total: " +
                    formatNaira(
                        total
                    ),

                    "Name: " +
                    name,

                    "Phone: " +
                    phone,

                    "Payment method: " +
                    payment,

                    "",

                    "Please confirm my order and payment details."

                ].join("\n");


                // -----------------------------------------
                // WHATSAPP URL
                // -----------------------------------------

                const whatsappURL =
                    "https://wa.me/" +
                    MERCHANDISE_WHATSAPP +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


                // -----------------------------------------
                // OPEN WHATSAPP
                // -----------------------------------------

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );


        // =================================================
        // MOBILE MENU
        // =================================================

        if (
            mobileMenuButton &&
            navigation
        ) {

            mobileMenuButton.addEventListener(
                "click",
                function () {

                    const isOpen =
                        navigation.classList.toggle(
                            "is-open"
                        );


                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );


                    mobileMenuButton.setAttribute(
                        "aria-label",
                        isOpen
                            ? "Close menu"
                            : "Open menu"
                    );

                }
            );


            // ---------------------------------------------
            // CLOSE MENU AFTER LINK CLICK
            // ---------------------------------------------

            navigation
                .querySelectorAll("a")
                .forEach(
                    function (
                        link
                    ) {

                        link.addEventListener(
                            "click",
                            function () {

                                navigation.classList.remove(
                                    "is-open"
                                );


                                mobileMenuButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );


                                mobileMenuButton.setAttribute(
                                    "aria-label",
                                    "Open menu"
                                );

                            }
                        );

                    }
                );

        }


        // =================================================
        // CURRENT YEAR
        // =================================================

        const year =
            document.getElementById(
                "yr"
            );


        if (year) {

            year.textContent =
                new Date()
                    .getFullYear();

        }


        // =================================================
        // INITIAL CART
        // =================================================

        renderCart();

    }
);