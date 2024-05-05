// import { useEffect, useState } from "react";
// import axios from "axios";
// import { pdfjs } from "react-pdf";
// import PdfComp from "../PdfComp";
// import '@fontsource/baloo-bhai-2';
// import { Link, useNavigate } from "react-router-dom";
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.js",
//     import.meta.url
// ).toString();

// function App() {
//     const [title, setTitle] = useState("");
//     const [file, setFile] = useState("");
//     const [allImage, setAllImage] = useState(null);
//     const [pdfFile, setPdfFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [editTitleId, setEditTitleId] = useState(null);

//     useEffect(() => {
//         getPdf();
//     }, []);

//     const getPdf = async () => {
//         setLoading(true);
//         try {
//             const result = await axios.get("BACKEND/get-files");
//             setAllImage(result.data.data);
//             setLoading(false);
//         } catch (error) {
//             setError("Error fetching PDF files");
//             setLoading(false);
//         }
//     };

//     const submitImage = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("file", file);

//         try {
//             const result = await axios.post(
//                 "BACKEND/upload-files",
//                 formData,
//                 {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 }
//             );
//             if (result.data.status === "ok") {
//                 alert("Uploaded Successfully!!!");
//                 getPdf();
//             }
//             setLoading(false);
//         } catch (error) {
//             setError("Error uploading PDF");
//             setLoading(false);
//         }
//     };

//     const showPdf = (pdf) => {
//         setPdfFile(`BACKEND/files/${pdf}`);
//     };

//     const handleEditTitle = async (id, newTitle) => {
//         setLoading(true);
//         try {
//             const result = await axios.put(
//                 `BACKEND/update-title/${id}`,
//                 { title: newTitle }
//             );
//             if (result.data.status === "ok") {
//                 alert("Title Updated Successfully!!!");
//                 setEditTitleId(null);
//                 getPdf();
//             }
//             setLoading(false);
//         } catch (error) {
//             setError("Error updating title");
//             setLoading(false);
//         }
//     };

//     const deletePdf = async (id) => {
//         setLoading(true);
//         try {
//             const result = await axios.delete(
//                 `BACKEND/delete-file/${id}`
//             );
//             if (result.data.status === "ok") {
//                 alert("PDF Deleted Successfully!!!");
//                 getPdf();
//             }
//             setLoading(false);
//         } catch (error) {
//             setError("Error deleting PDF");
//             setLoading(false);
//         }
//     };

//     return (
        
//         <div className="bg-cyan-500 min-h-screen p-8" >
//             <Link to="/speech" className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 mx-auto">
//                 Switch to Speech
//             </Link>
//             <form className="max-w-md mx-auto p-4 bg-white rounded shadow-md" onSubmit={submitImage}>
//                 <h4 className="text-xl mb-4" style={{ fontFamily: 'Baloo Bhai 2, cursive' }}>Upload Pdf in React</h4>
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         className="w-full p-2 border rounded"
//                         placeholder="Title"
//                         required
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-4">

//                     <input
//                         type="file"
//                         className="w-full p-2 border rounded"
//                         accept="application/pdf"
//                         required
//                         onChange={(e) => setFile(e.target.files[0])}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
//                         Submit
//                     </button>
//                 </div>
//             </form>

//             {loading && <p className="text-center mt-4">Loading...</p>}
//             {error && <p className="text-center mt-4 text-red-500">{error}</p>}

//             {/* <div className="mt-8">
//         <h4 className="text-xl mb-4">Uploaded PDF:</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {allImage == null
//             ? ""
//             : allImage.map((data) => {
//               return (
//                 <div key={data._id} className="bg-white rounded shadow-md p-4">
//                   <h6 className="text-lg mb-2">Title: {data.title}</h6>
//                   <button
//                     className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
//                     onClick={() => showPdf(data.pdf)}
//                   >
//                     Show Pdf
//                   </button>
//                 </div>
//               );
//             })}
//         </div>
//       </div> */}
//             <div className="mt-8">
//                 <h4 className="text-xl mb-4">Uploaded PDF:</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {allImage == null
//                         ? ""
//                         : allImage.map((data) => {
//                             return (
//                                 <div key={data._id} className="bg-white rounded shadow-md p-4 flex flex-col">
//                                     <div className="flex justify-between items-center mb-2">
//                                         {editTitleId === data._id ? (
//                                             <input
//                                                 type="text"
//                                                 className="w-full p-2 border rounded"
//                                                 defaultValue={data.title}
//                                                 onChange={(e) => setTitle(e.target.value)}
//                                             />
//                                         ) : (
//                                             <h6 className="text-lg">Title: {data.title}</h6>
//                                         )}
//                                         <div>
//                                             {editTitleId === data._id ? (
//                                                 <button
//                                                     className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 mr-2"
//                                                     onClick={() => handleEditTitle(data._id, title)}
//                                                 >
//                                                     Save
//                                                 </button>
//                                             ) : (
//                                                 <button
//                                                     className="bg-green-500 text-white rounded px-4 py-2 hover:bg-blue-600 mr-2"
//                                                     onClick={() => setEditTitleId(data._id)}
//                                                 >
//                                                     Edit Name
//                                                 </button>
//                                             )}
//                                             <button
//                                                 className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
//                                                 onClick={() => deletePdf(data._id)}
//                                             >
//                                                 Delete PDF
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <button
//                                         className="bg-blue-500 text-white rounded px-4 py-2 mt-auto hover:bg-blue-600"
//                                         onClick={() => showPdf(data.pdf)}
//                                     >
//                                         Show Pdf
//                                     </button>
//                                 </div>
//                             );
//                         })}
//                 </div>
//             </div>
       

//             <PdfComp pdfFile={pdfFile} />
//         </div>
//     );
// }
// export default App;


import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "../PdfComp";
const BACKEND = import.meta.env.VITE_NEXT_PUBLIC_BACKEND_ROUTE;
// import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import '@fontsource/baloo-bhai-2';
import { Link, useNavigate } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

function App() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editTitleId, setEditTitleId] = useState(null);

    useEffect(() => {
        getPdf();
    }, []);

    const getPdf = async () => {
        setLoading(true);
        try {
            const result = await axios.get("BACKEND/get-files");
            setAllImage(result.data.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching PDF files");
            setLoading(false);
        }
    };

    const submitImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        try {
            const result = await axios.post(
                "BACKEND/upload-files",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (result.data.status === "ok") {
                //
                // alert("Uploaded Successfully!!!");
                toast.success("Uploaded")
                getPdf();
            }
            setLoading(false);
        } catch (error) {
            setError("Error uploading PDF");
            setLoading(false);
        }
    };

    const showPdf = (pdf) => {
        setPdfFile(`BACKEND/files/${pdf}`);
    };

    const handleEditTitle = async (id, newTitle) => {
        setLoading(true);
        try {
            const result = await axios.put(
                `BACKEND/update-title/${id}`,
                { title: newTitle }
            );
            if (result.data.status === "ok") {
                // alert("Title Updated Successfully!!!");
                toast.success("Title Updated Successfully!!!")
                setEditTitleId(null);
                getPdf();
            }
            setLoading(false);
        } catch (error) {
            setError("Error updating title");
            setLoading(false);
        }
    };

    const deletePdf = async (id) => {
        setLoading(true);
        try {
            const result = await axios.delete(
                `BACKEND/delete-file/${id}`
            );
            if (result.data.status === "ok") {
                // alert("PDF Deleted Successfully!!!");
                toast.success("Pdf is deleted successfully!!!")
                getPdf();
            }
            setLoading(false);
        } catch (error) {
            // setError("Error deleting PDF");
            toast.error("Error uploading pdf")
            setLoading(false);
        }
    };

    return (

        <div className="bg-cyan-500 min-h-screen p-8" >
            <Link to="/speech" className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 mx-auto">
                Switch to Speech
            </Link>
            <form className="max-w-md mx-auto p-4 bg-white rounded shadow-md" onSubmit={submitImage}>
                <h4 className="text-xl mb-4" style={{ fontFamily: 'Baloo Bhai 2, cursive' }}>Upload Pdf in React</h4>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">

                    <input
                        type="file"
                        className="w-full p-2 border rounded"
                        accept="application/pdf"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div className="mb-4">
                    <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
                        Submit
                    </button>
                </div>
            </form>

            {loading && <p className="text-center mt-4">Loading...</p>}
            {error && <p className="text-center mt-4 text-red-500">{error}</p>}

            {/* <div className="mt-8">
        <h4 className="text-xl mb-4">Uploaded PDF:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allImage == null
            ? ""
            : allImage.map((data) => {
              return (
                <div key={data._id} className="bg-white rounded shadow-md p-4">
                  <h6 className="text-lg mb-2">Title: {data.title}</h6>
                  <button
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                    onClick={() => showPdf(data.pdf)}
                  >
                    Show Pdf
                  </button>
                </div>
              );
            })}
        </div>
      </div> */}
            <div className="mt-8">
                <h4 className="text-xl mb-4">Uploaded PDF:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allImage == null
                        ? ""
                        : allImage.map((data) => {
                            return (
                                <div key={data._id} className="bg-white rounded shadow-md p-4 flex flex-col">
                                    <div className="flex justify-between items-center mb-2">
                                        {editTitleId === data._id ? (
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded"
                                                defaultValue={data.title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        ) : (
                                            <h6 className="text-lg">Title: {data.title}</h6>
                                        )}
                                        <div>
                                            {editTitleId === data._id ? (
                                                <button
                                                    className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 mr-2"
                                                    onClick={() => handleEditTitle(data._id, title)}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 text-white rounded px-4 py-2 hover:bg-blue-600 mr-2"
                                                    onClick={() => setEditTitleId(data._id)}
                                                >
                                                    Edit Name
                                                </button>
                                            )}
                                            <button
                                                className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
                                                onClick={() => deletePdf(data._id)}
                                            >
                                                Delete PDF
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="bg-blue-500 text-white rounded px-4 py-2 mt-auto hover:bg-blue-600"
                                        onClick={() => showPdf(data.pdf)}
                                    >
                                        Show Pdf
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>


            <PdfComp pdfFile={pdfFile} />
        </div>
    );
}
export default App;






