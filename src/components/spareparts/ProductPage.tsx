/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import { useSparePartsDataset } from '../spareparts/data/Product';
import { IoMdArrowRoundBack } from "react-icons/io";
// import { postSparePartsData } from '../../features/spareparts';
import { useState } from 'react'
import spareImg from '../../assets/CarPart1.jfif'


const ProductPage = () => {

  const { productId } = useParams();

  const [quantity, setQuantity] = useState(1);

  const { parts } = useSparePartsDataset();

  const navigate = useNavigate();
  const fallBack = () => {
    navigate(-1);
  }


  const product = parts.filter((item: any) => item.id === productId);
  console.log("product id", product);


  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    //   toast.success('Item added to cart!');

    // Reset button after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // const handleAddToCart = async (part: SparePart) => {
  //         try {
  //             const payload = {
  //                 products: {
  //                     productId: part.id,
  //                     price: part.price?.toString(),
  //                     quantity: quantity,
  //                 },
  //                 type: 'spare',
  //             };
  //             const response = await postSparePartsData(payload);
  //             console.log(response, 'add to cart response');
  //         } catch (error) {
  //             console.error('Error adding to cart:', error);
  //         }
  //     };
  return (
    <>
      {product.map((item: any, index: number) => (
        <div className="container mx-auto p-6" key={item.id || index}>
          <IoMdArrowRoundBack
            onClick={fallBack}
            className=" relative right-[10px] text-3xl text-black  cursor-pointer mb-4"
          />
          <div className="flex  items-center xs:flex-col sm:flex-col md:flex-row gap-8">
            <div className="md:w-2/5 sm:w-4/5">
              <img
                src={spareImg}
                alt={item.spareparts_name}
                className="w-full rounded-lg"
              />

            </div>
            <div className="md:w-2/5">
              <h1 className="text-2xl font-bold mb-4">{item.spareparts_name}</h1>
              <p className="text-xl text-[#0050A5] font-semibold mb-4">₹{item.price}</p>
              <p className="mb-6">{item.spareparts_name}</p>

              <h2 className="text-lg font-semibold mb-2">Specifications:</h2>
              <ul className="mb-6">

                <li key={index} className="mb-1">• {item.spareparts_name}</li>

              </ul>

              <div className='flex items-center gap-2 mb-4'>
                <span className='text-sm font-medium'>Quantity:</span>
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                >
                  -
                </button>
                <span className='px-2'>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                >
                  +
                </button>
              </div>

              <div className='text-sm mt-3 mb-2'>
                Total Price:{' '}
                <span className='font-semibold text-[#0050A5]'>
                  ₹{(Number(item.price) * quantity).toLocaleString()}
                </span>
              </div>

              {/* <Toaster position="top-center" /> */}
              <button
                onClick={handleAddToCart}
                className={`w-[150px] bg-[#0050A5] text-white font-semibold py-1 rounded-full transition-all duration-300 transform  shadow-lg `}
              >
                {isAdded ? 'Added!' : 'Add To Cart'}
              </button>

            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductPage;