import { useState, useMemo } from "react";
const questions = [
    {
        id: 1,
        Category: "Add 2 numbers",
        Company: "easy",
        Product: "solved",
        Description: "The latest iPhone with advanced features",
        Price: 999,
        CustomDetails: [
            {
                Date: "2023-09-05",
                Customer: "John Doe",
                Quantity: 2,
                TotalAmount: 1998,
            },
            {
                Date: "2023-09-04",
                Customer: "Jane Smith",
                Quantity: 1,
                TotalAmount: 999,
            },
        ],
    },
    {
        id: 2,
        Category: "Clothing",
        Company: "Nike",
        Product: "Running Shoes",
        Description: "High-quality running shoes for athletes",
        Price: 89,
        CustomDetails: [
            {
                Date: "2023-09-05",
                Customer: "Alice Johnson",
                Quantity: 3,
                TotalAmount: 267,
            },
            {
                Date: "2023-09-03",
                Customer: "Bob Brown",
                Quantity: 2,
                TotalAmount: 178,
            },
        ],
    },
    {
        id: 3,
        Category: "Books",
        Company: "Penguin Books",
        Product: "The Great Gatsby",
        Description: "Classic novel by F. Scott Fitzgerald",
        Price: 12,
        CustomDetails: [
            {
                Date: "2023-09-02",
                Customer: "Ella Williams",
                Quantity: 5,
                TotalAmount: 60,
            },
        ],
    },
    {
        id: 4,
        Category: "Home Appliances",
        Company: "Samsung",
        Product: "Smart Refrigerator",
        Description: "Refrigerator with smart features and spacious design",
        Price: 14,
        CustomDetails: [
            {
                Date: "2023-09-05",
                Customer: "David Wilson",
                Quantity: 1,
                TotalAmount: 14,
            },
        ],
    },
    {
        id: 5,
        Category: "Electronics",
        Company: "Sony",
        Product: "PlayStation 5",
        Description: "Next-gen gaming console",
        Price: 499,
        CustomDetails: [
            {
                Date: "2023-09-06",
                Customer: "Sarah Davis",
                Quantity: 1,
                TotalAmount: 499,
            },
        ],
    },
    {
        id: 6,
        Category: "Clothing",
        Company: "Adidas",
        Product: "Sneakers",
        Description: "Stylish sneakers for everyday wear",
        Price: 75,
        CustomDetails: [
            {
                Date: "2023-09-07",
                Customer: "Michael Lee",
                Quantity: 2,
                TotalAmount: 150,
            },
        ],
    },
    {
        id: 7,
        Category: "Electronics",
        Company: "Samsung",
        Product: "4K Smart TV",
        Description: "High-quality 4K television with smart features",
        Price: 799,
        CustomDetails: [
            {
                Date: "2023-09-08",
                Customer: "Sophia Anderson",
                Quantity: 1,
                TotalAmount: 799,
            },
        ],
    },
    {
        id: 8,
        Category: "Home Appliances",
        Company: "LG",
        Product: "Front-Load Washer",
        Description: "Efficient front-load washing machine",
        Price: 599,
        CustomDetails: [
            {
                Date: "2023-09-09",
                Customer: "William Taylor",
                Quantity: 1,
                TotalAmount: 599,
            },
        ],
    },
    {
        id: 9,
        Category: "Books",
        Company: "HarperCollins",
        Product: "To Kill a Mockingbird",
        Description: "Classic novel by Harper Lee",
        Price: 15,
        CustomDetails: [
            {
                Date: "2023-09-10",
                Customer: "Olivia Martinez",
                Quantity: 3,
                TotalAmount: 45,
            },
        ],
    },
    {
        id: 10,
        Category: "Clothing",
        Company: "H&M",
        Product: "Denim Jeans",
        Description: "Stylish denim jeans for men and women",
        Price: 49,
        CustomDetails: [
            {
                Date: "2023-09-11",
                Customer: "James Johnson",
                Quantity: 2,
                TotalAmount: 98,
            },
        ],
    },
    {
        id: 11,
        Category: "Electronics",
        Company: "Sony",
        Product: "Wireless Headphones",
        Description: "High-quality wireless headphones with noise cancellation",
        Price: 249,
        CustomDetails: [
            {
                Date: "2023-09-12",
                Customer: "Liam Jackson",
                Quantity: 1,
                TotalAmount: 249,
            },
        ],
    },
    {
        id: 12,
        Category: "Home Appliances",
        Company: "KitchenAid",
        Product: "Stand Mixer",
        Description: "Powerful stand mixer for baking and cooking",
        Price: 299,
        CustomDetails: [
            {
                Date: "2023-09-13",
                Customer: "Ava Harris",
                Quantity: 1,
                TotalAmount: 299,
            },
        ],
    },
    {
        id: 13,
        Category: "Books",
        Company: "Random House",
        Product: "The Catcher in the Rye",
        Description: "Classic novel by J.D. Salinger",
        Price: 10,
        CustomDetails: [
            {
                Date: "2023-09-14",
                Customer: "Noah Martinez",
                Quantity: 4,
                TotalAmount: 40,
            },
        ],
    },
    {
        id: 14,
        Category: "Clothing",
        Company: "Zara",
        Product: "Leather Jacket",
        Description: "Stylish leather jacket for men and women",
        Price: 129,
        CustomDetails: [
            {
                Date: "2023-09-15",
                Customer: "Sophia Wilson",
                Quantity: 2,
                TotalAmount: 258,
            },
        ],
    },
    {
        id: 15,
        Category: "Electronics",
        Company: "Bose",
        Product: "Bluetooth Speaker",
        Description: "Portable Bluetooth speaker with excellent sound quality",
        Price: 129,
        CustomDetails: [
            {
                Date: "2023-09-16",
                Customer: "Mason Davis",
                Quantity: 3,
                TotalAmount: 387,
            },
        ],
    },
    {
        id: 16,
        Category: "Books",
        Company: "Simon & Schuster",
        Product: "1984",
        Description: "Dystopian novel by George Orwell",
        Price: 14,
        CustomDetails: [
            {
                Date: "2023-09-18",
                Customer: "Lucas Taylor",
                Quantity: 5,
                TotalAmount: 70,
            },
        ],
    },
    {
        id: 17,
        Category: "Clothing",
        Company: "Forever 21",
        Product: "Summer Dress",
        Description: "Casual summer dress for women",
        Price: 29,
        CustomDetails: [
            {
                Date: "2023-09-19",
                Customer: "Aiden Brown",
                Quantity: 4,
                TotalAmount: 116,
            },
        ],
    },
    {
        id: 18,
        Category: "Electronics",
        Company: "Microsoft",
        Product: "Xbox Series X",
        Description: "Next-gen gaming console by Microsoft",
        Price: 499,
        CustomDetails: [
            {
                Date: "2023-09-20",
                Customer: "Luna Garcia",
                Quantity: 1,
                TotalAmount: 499,
            },
        ],
    },
    {
        id: 19,
        Category: "Home Appliances",
        Company: "Cuisinart",
        Product: "Coffee Maker",
        Description: "Programmable coffee maker for coffee lovers",
        Price: 69,
        CustomDetails: [
            {
                Date: "2023-09-21",
                Customer: "Eli Johnson",
                Quantity: 2,
                TotalAmount: 138,
            },
        ],
    },
    {
        id: 20,
        Category: "Electronics",
        Company: "Bose",
        Product: "Bluetooth Speaker",
        Description: "Portable Bluetooth speaker with excellent sound quality",
        Price: 129,
        CustomDetails: [
            {
                Date: "2023-09-16",
                Customer: "Mason Davis",
                Quantity: 3,
                TotalAmount: 387,
            },
        ],
    },
    {
        id: 21,
        Category: "Books",
        Company: "Simon & Schuster",
        Product: "1984",
        Description: "Dystopian novel by George Orwell",
        Price: 14,
        CustomDetails: [
            {
                Date: "2023-09-18",
                Customer: "Lucas Taylor",
                Quantity: 5,
                TotalAmount: 70,
            },
        ],
    },
    {
        id: 22,
        Category: "Clothing",
        Company: "Forever 21",
        Product: "Summer Dress",
        Description: "Casual summer dress for women",
        Price: 29,
        CustomDetails: [
            {
                Date: "2023-09-19",
                Customer: "Aiden Brown",
                Quantity: 4,
                TotalAmount: 116,
            },
        ],
    },
    {
        id: 23,
        Category: "Electronics",
        Company: "Microsoft",
        Product: "Xbox Series X",
        Description: "Next-gen gaming console by Microsoft",
        Price: 499,
        CustomDetails: [
            {
                Date: "2023-09-20",
                Customer: "Luna Garcia",
                Quantity: 1,
                TotalAmount: 499,
            },
        ],
    },
    {
        id: 24,
        Category: "Home Appliances",
        Company: "Cuisinart",
        Product: "Coffee Maker",
        Description: "Programmable coffee maker for coffee lovers",
        Price: 69,
        CustomDetails: [
            {
                Date: "2023-09-21",
                Customer: "Eli Johnson",
                Quantity: 2,
                TotalAmount: 138,
            },
        ],
    },
    {
        id: 15,
        Category: "Electronics",
        Company: "Bose",
        Product: "Bluetooth Speaker",
        Description: "Portable Bluetooth speaker with excellent sound quality",
        Price: 129,
        CustomDetails: [
            {
                Date: "2023-09-16",
                Customer: "Mason Davis",
                Quantity: 3,
                TotalAmount: 387,
            },
        ],
    },
    {
        id: 16,
        Category: "Books",
        Company: "Simon & Schuster",
        Product: "1984",
        Description: "Dystopian novel by George Orwell",
        Price: 14,
        CustomDetails: [
            {
                Date: "2023-09-18",
                Customer: "Lucas Taylor",
                Quantity: 5,
                TotalAmount: 70,
            },
        ],
    },
    {
        id: 17,
        Category: "Clothing",
        Company: "Forever 21",
        Product: "Summer Dress",
        Description: "Casual summer dress for women",
        Price: 29,
        CustomDetails: [
            {
                Date: "2023-09-19",
                Customer: "Aiden Brown",
                Quantity: 4,
                TotalAmount: 116,
            },
        ],
    },
    {
        id: 18,
        Category: "Electronics",
        Company: "Microsoft",
        Product: "Xbox Series X",
        Description: "Next-gen gaming console by Microsoft",
        Price: 499,
        CustomDetails: [
            {
                Date: "2023-09-20",
                Customer: "Luna Garcia",
                Quantity: 1,
                TotalAmount: 499,
            },
        ],
    },
    {
        id: 19,
        Category: "Home Appliances",
        Company: "Cuisinart",
        Product: "Coffee Maker",
        Description: "Programmable coffee maker for coffee lovers",
        Price: 69,
        CustomDetails: [
            {
                Date: "2023-09-21",
                Customer: "Eli Johnson",
                Quantity: 2,
                TotalAmount: 138,
            },
        ],
    },
    {
        id: 15,
        Category: "Electronics",
        Company: "Bose",
        Product: "Bluetooth Speaker",
        Description: "Portable Bluetooth speaker with excellent sound quality",
        Price: 129,
        CustomDetails: [
            {
                Date: "2023-09-16",
                Customer: "Mason Davis",
                Quantity: 3,
                TotalAmount: 387,
            },
        ],
    },
];

    


const TableReact = () => {
    const [searchItem, setSearchItem] = useState("")
    const [products, setProducts] = useState(questions);
  
    const handleChange = (e) => { 
      const searchTerm = e.target.value;
      setSearchItem(searchTerm)
  
      const filteredItems = questions.filter((question) =>
      question.Category.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setProducts(filteredItems);
    }


    const [productList] = useState(products);
    const [rowsLimit] = useState(15);
    const [rowsToShow, setRowsToShow] = useState(productList.slice(0, rowsLimit));
    const [customPagination, setCustomPagination] = useState([]);
    const [totalPage] = useState(Math.ceil(productList?.length / rowsLimit));
    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        const startIndex = rowsLimit * (currentPage + 1);
        const endIndex = startIndex + rowsLimit;
        const newArray = products.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(currentPage + 1);
    };
    const changePage = (value) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = products.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(value);
    };
    const previousPage = () => {
        const startIndex = (currentPage - 1) * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = products.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(0);
        }
    };
    useMemo(() => {
        setCustomPagination(
            Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
        );
    }, []);
    return (
        <>
            <form class="flex items-center max-w-sm md:ml-20 ml-2">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                        </svg>
                    </div>
                    <input type="text" value={searchItem} onChange={handleChange} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search a question..." required />
                </div>
                {/* <button class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button> */}
            </form>
            <div className="min-h-screen h-full bg-white flex  items-center justify-center  pb-14">
                <div className="w-full max-w-6xl px-2">
                    <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                        <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
                            <thead className="rounded-lg text-base text-blue-100 font-semibold w-full">
                                <tr className="bg-blue-400">
                                    <th className="py-3 px-3 text-[#e7f9ff] sm:text-base font-bold whitespace-nowrap">
                                        ID
                                    </th>
                                    <th className="py-3 px-3 text-[#e7f9ff] sm:text-base font-bold whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="py-3 px-3  justify-center gap-1 text-[#e7f9ff] sm:text-base font-bold whitespace-nowrap">
                                        Difficulty
                                    </th>
                                    <th className="py-3 px-3 text-[#e7f9ff] sm:text-base font-bold whitespace-nowrap">
                                        Solved Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowsToShow?.map((data, index) => (
                                    <tr
                                        className={`${"bg-slate-100 hover:bg-slate-200"
                                            } `}
                                        key={index}
                                    >
                                        <td
                                            className={`py-2 px-3 font-normal text-base ${index == 0
                                                ? "border-t-2 border-blue-800"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?.id}
                                        </td>
                                        <td
                                            className={`py-2 px-3 font-normal text-base ${index == 0
                                                ? "border-t-2 border-blue-800"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?.Category}
                                        </td>
                                        <td
                                            className={`py-2 px-3 font-normal text-base ${index == 0
                                                ? "border-t-2 border-blue-800"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?.Company}
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-base  font-normal ${index == 0
                                                ? "border-t-2 border-blue-800"
                                                : index == rowsToShow?.length
                                                    ? "border-y"
                                                    : "border-t"
                                                } whitespace-nowrap`}
                                        >
                                            {data?.Product}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                        <div className="text-lg">
                            Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                            {currentPage == totalPage - 1
                                ? productList?.length
                                : (currentPage + 1) * rowsLimit}{" "}
                            of {productList?.length} entries
                        </div>
                        <div className="flex">
                            <ul
                                class="flex justify-center items-center gap-x-[10px] z-30"
                                role="navigation"
                                aria-label="Pagination"
                            >
                                <li
                                    class={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                                        ? "bg-[#cccccc] pointer-events-none"
                                        : " cursor-pointer"
                                        }
  `}
                                    onClick={previousPage}
                                >
                                    <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                                </li>
                                {customPagination?.map((data, index) => (
                                    <li
                                        className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${currentPage == index
                                            ? "text-blue-600  border-sky-500"
                                            : "border-[#E4E4EB] "
                                            }`}
                                        onClick={() => changePage(index)}
                                        key={index}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                                <li
                                    class={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage == totalPage - 1
                                        ? "bg-[#cccccc] pointer-events-none"
                                        : " cursor-pointer"
                                        }`}
                                    onClick={nextPage}
                                >
                                    <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TableReact;
