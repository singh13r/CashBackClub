        // ===== DATA =====
        var PRODUCTS = [{
                id: 1,
                name: "boAt Rockerz 650 Pro Headphones",
                price: "Rs.2,999",
                cashback: "2%",
                cat: "tech",
                img: "images/products/boat-headphones.jpg",
                link: "https://www.amazon.in/boAt-Rockerz-650-Pro-Headphones/dp/B0DV5J28LW"
            }, {
                id: 2,
                name: "Redmi Note 15 Pro+ 5G 256GB",
                price: "Rs.26,999",
                cashback: "5%",
                cat: "tech",
                img: "images/products/redmi-phone.png",
                link: "https://www.amazon.in/dp/B0GF23R9B6"
            }, {
                id: 4,
                name: "Acer Aspire Lite Ryzen 7 Laptop",
                price: "Check Store",
                cashback: "6%",
                cat: "tech",
                img: "images/products/Acer Aspire lite.jpg",
                link: "https://www.amazon.in/dp/B0FCXZ85YX"
            }, {
                id: 5,
                name: "Lenovo IdeaPad Slim 3 Gen 8 Laptop",
                price: "Check Store",
                cashback: "6%",
                cat: "tech",
                img: "images/products/lenovo ideapad.jpg",
                link: "https://www.amazon.in/dp/B0F8QFMXJ7"
            }, {
                id: 6,
                name: "Dell 15 AI Powered Core Ultra 5 Laptop",
                price: "Check Store",
                cashback: "6%",
                cat: "tech",
                img: "images/products/Dell 15 AI Powered Laptop.jpg",
                link: "https://www.amazon.in/dp/B0GWHGS8P5"
            }, {
                id: 7,
                name: "Fastrack Astor FR2 Pro Smartwatch",
                price: "Rs.3,995",
                cashback: "3%",
                cat: "tech",
                img: "images/products/fastrack-watch.jpg",
                link: "https://www.amazon.in/dp/B0DGGVHMDS"
            },
            {
                id: 10,
                name: "Amazon/Flipkart Echo Dot 5th Gen",
                price: "Rs.4,499",
                cashback: "4%",
                cat: "tech",
                img: "images/products/echo-dot.jpg",
                link: "https://www.amazon.in/dp/B09B8XJDW5"
            },
        ];

        var PRODUCT_MARKET_DATA = {
            1: {
                amazonPrice: "Rs.2,999",
                amazonLink: "https://www.amazon.in/boAt-Rockerz-650-Pro-Headphones/dp/B0DV5J28LW",
                flipkartPrice: "Rs.3,149",
                flipkartLink: "https://www.flipkart.com/boat-rockerz-650-pro-2025-launch-touch-swipe-controls-dolby-audio-80-hrs-battery-bluetooth/p/itmded454eeb49f5?pid=ACCH8GEKZGUC4GHW"
            },
            2: {
                amazonPrice: "Rs.26,999",
                amazonLink: "https://www.amazon.in/dp/B0GF23R9B6",
                flipkartPrice: "Rs.27,499",
                flipkartLink: "https://www.flipkart.com/redmi-note-15-pro-5g-carbon-black-256-gb/p/itm53c77b92f509c?pid=MOBHK464A2HGQ9DM"
            },
            4: {
                amazonPrice: "Check Store",
                amazonLink: "https://www.amazon.in/dp/B0FCXZ85YX",
                flipkartPrice: "Check Store",
                flipkartLink: "https://www.flipkart.com/acer-aspire-lite-amd-ryzen-7-octa-core-7730u-16-gb-512-gb-ssd-windows-11-home-al15-41-thin-light-laptop/p/itm1bc0bcb4598e7?pid=COMHY74JVWWHKWKA"
            },
            5: {
                amazonPrice: "Check Store",
                amazonLink: "https://www.amazon.in/dp/B0F8QFMXJ7",
                flipkartPrice: "Check Store",
                flipkartLink: "https://www.flipkart.com/lenovo-ideapad-slim-3-intel-core-i3-13th-gen-1315u-8-gb-512-gb-ssd-windows-11-home-15iru8-thin-light-laptop/p/itmc6707c8d4b21b?pid=COMHFMPWQSGRSZ9T"
            },
            6: {
                amazonPrice: "Check Store",
                amazonLink: "https://www.amazon.in/dp/B0GWHGS8P5",
                flipkartPrice: "Check Store",
                flipkartLink: "https://www.flipkart.com/dell-15-ai-powered-intel-core-ultra-5-225h-16-gb-512-gb-ssd-windows-11-home-thin-light-laptop/p/itm3d19bf8ab4b69?pid=COMHM29DAFVUFDWE"
            },
            7: {
                amazonPrice: "Rs.3,995",
                amazonLink: "https://www.amazon.in/dp/B0DGGVHMDS",
                flipkartPrice: "Rs.4,149",
                flipkartLink: "https://www.flipkart.com/fastrack-revoltt-fr2-pro-smartwatch/p/itm1824bd884eeaa?pid=SMWHF7GMGRUKJA5X"
            },
            10: {
                amazonPrice: "Rs.4,499",
                amazonLink: "https://www.amazon.in/dp/B09B8XJDW5",
                flipkartPrice: "Rs.4,799",
                flipkartLink: "https://www.flipkart.com/alexa-echo-dot-5th-gen-bluetooth-assistant-smart-speaker/p/itm9a342ef093026?pid=ACCH4N5D5DYKVDG9"
            },

        };

        var txData = [{
            emoji: "🎧",
            name: "boAt Rockerz 450",
            date: "Mar 10",
            amount: "+Rs.89",
            cls: "green",
            status: "approved"
        }, {
            emoji: "📱",
            name: "Redmi Note 13 Pro",
            date: "Mar 09",
            amount: "+Rs.959",
            cls: "gold",
            status: "pending"
        }, {
            emoji: "🍳",
            name: "Philips Air Fryer",
            date: "Mar 07",
            amount: "+Rs.360",
            cls: "green",
            status: "approved"
        }, {
            emoji: "👟",
            name: "Campus Running Shoes",
            date: "Mar 05",
            amount: "+Rs.63",
            cls: "green",
            status: "approved"
        }, {
            emoji: "💸",
            name: "UPI Withdrawal",
            date: "Mar 01",
            amount: "-Rs.500",
            cls: "red",
            status: "approved"
        }, ];

        var adminClaims = [{
            user: "Gurjot Singh",
            product: "Redmi Note 13 Pro",
            orderId: "402-8234567-1234567",
            amount: "Rs.959",
            status: "pending"
        }, {
            user: "Priya Sharma",
            product: "boAt Rockerz 450",
            orderId: "402-1234111-9876543",
            amount: "Rs.89",
            status: "pending"
        }, {
            user: "Arjun Mehta",
            product: "Philips Air Fryer",
            orderId: "405-3456789-2345678",
            amount: "Rs.360",
            status: "approved"
        }, {
            user: "Simran Kaur",
            product: "Fitbit Inspire 3",
            orderId: "402-9876543-1111111",
            amount: "Rs.399",
            status: "rejected"
        }, {
            user: "Rahul Kumar",
            product: "HP Laptop",
            orderId: "402-1111111-2222222",
            amount: "Rs.1,079",
            status: "pending"
        }, ];

        var adminWithdrawals = [{
            user: "Gurjot Singh",
            method: "Google Pay - gurjot@okaxis",
            amount: "Rs.500",
            status: "pending"
        }, {
            user: "Priya Sharma",
            method: "Paytm - 9876543210",
            amount: "Rs.200",
            status: "pending"
        }, {
            user: "Arjun Mehta",
            method: "PhonePe - arjun@ybl",
            amount: "Rs.350",
            status: "approved"
        }, ];

        var adminUsers = [{
            name: "Gurjot Singh",
            email: "gurjot@gmail.com",
            balance: "Rs.348",
            claims: 5,
            status: "active"
        }, {
            name: "Priya Sharma",
            email: "priya@gmail.com",
            balance: "Rs.89",
            claims: 2,
            status: "active"
        }, {
            name: "Arjun Mehta",
            email: "arjun@gmail.com",
            balance: "Rs.210",
            claims: 3,
            status: "active"
        }, {
            name: "Simran Kaur",
            email: "simran@gmail.com",
            balance: "Rs.0",
            claims: 1,
            status: "active"
        }, {
            name: "Rahul Kumar",
            email: "rahul@gmail.com",
            balance: "Rs.1,200",
            claims: 4,
            status: "active"
        }, ];

        var currentUser = null;
        var selectedUpiMethod = "gpay";

        var ADMIN_ACCESS = {
            "gur1322r@gmail.com": {
                label: "Owner Admin",
                viewOverview: true,
                viewClaims: true,
                viewWithdrawals: true,
                viewUsers: true,
                approveClaims: true,
                approveWithdrawals: true
            },
            "officalankitrajput@gmail.com": {
                label: "Review Admin",
                viewOverview: false,
                viewClaims: true,
                viewWithdrawals: true,
                viewUsers: false,
                approveClaims: false,
                approveWithdrawals: false
            }
        };
