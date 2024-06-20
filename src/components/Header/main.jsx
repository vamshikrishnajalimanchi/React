//https://fakestoreapi.com/products

import React, { useEffect,useState,useRef } from 'react';
import './Header.css';

const LazyImage = ({ src, alt }) => {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const top = imageRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Check if the top position of the image is within the viewport or near the viewport
        if (top < windowHeight ) {
          setIsVisible(true);
          // Remove event listener once image is visible
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility on mount

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`image-container ${isVisible ? 'image-visible' : ''}`}>
      <img ref={imageRef} src={isVisible ? src : ''} alt={alt} className="lazy-image" />
    </div>
  );
};


const ProductGrid = ({ products,strtProd,endProd }) => {
  console.log('productgrid'+strtProd,endProd)
  return (
    <div className="product-grid">
      {products&&products.filter((product) => (strtProd<=product.id)&&(product.id<=endProd))
      .map((product,index)=>{return(
          <div key={index} className="product-card">
          <LazyImage src={product.image} alt={product.name} />
          <p>{"ID "+product.id}</p>
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          </div>
        )})
      }
    </div>
  );
};

const Main = () => {
    let [products, setProducts]=useState();
    let [strtProd,setStrtProd]=useState(1);
    let [endProd,setEndProd]=useState(5);
    let [noOfPages,setNoOfPages]=useState(0);
    let [presentPage,setPresentPage]=useState(1);
async function productSet(){
    let res=await fetch("https://fakestoreapi.com/products");
    let result=await res.json();
    setProducts(result);
    console.log(result);
        
if(result.length%5){
  setNoOfPages(()=>(result.length/5)+1);
  setStrtProd(()=>1);
  setEndProd(()=>5);
}else{
  let totalPages = Math.ceil(result.length / 5);
    setNoOfPages(()=>totalPages);
    setStrtProd(()=>1);
  setEndProd(()=>5);
}
}

    useEffect(()=>{
        productSet();
       // print5();
    },[])
    

    function prvPg(){
      if(presentPage>1){
        setPresentPage((prevPg)=>{
        let nextPg=prevPg-1;
        let StPr=(nextPg*5)-4;
        let EnPr=nextPg*5;
        setStrtProd(()=>StPr);
        setEndProd(()=>EnPr);
        return nextPg;});
      }
    }

    function nexPg(){
      if(presentPage<noOfPages){
      setPresentPage((prevPg)=>{
        let nextPg=prevPg+1;
        let StPr=(nextPg*5)-4;
        let EnPr=nextPg*5;
        setStrtProd(()=>StPr);
        setEndProd(()=>EnPr);
        return nextPg
      })
      }
    }
    
    function Strtpg(){
      if(presentPage!=1){
      setPresentPage(()=>1)
      setStrtProd(()=>(presentPage*5)-4)
      setEndProd(()=>presentPage*5)
      }
    }

    function Lstpg(){
      if(presentPage!=noOfPages){

        if(products.length%5){
          var rem=products.length%5;
          setStrtProd(()=>products.length-rem+1)
      setEndProd(()=>products.length)
        }
        else{
          setStrtProd(()=>products.length-4)
      setEndProd(()=>products.length)
        }
      }
    }
    return (
      <>
      <div>No of pages {noOfPages}
        <ProductGrid products={products} strtProd={strtProd} endProd={endProd}/>
        <button onClick={Strtpg}>start.pg</button>
        <button onClick={prvPg}>prev.pg</button>
        {presentPage}
        <button onClick={nexPg}>next.pg</button>
        <button onClick={Lstpg}>End.pg</button>
      </div>
      </>
    )
  
  
  }
      
export default Main;

{/* <div key={index} className="product-card">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div> */}
        // let noOfProd=5;
  // let totPg=result.length/5;
  // console.log(totPg)
  // setNoOfPages((totPg)=>totPg);
  // console.log('no of pages'+noOfPages)
  // setStrtProd(result.length)
  // // strtProd()
  // // setEndProd()
  // console.log(noOfPages);
  // console.log('no remainder'+strtProd)