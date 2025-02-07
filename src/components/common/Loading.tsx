import { useState, useEffect } from "react";
import styled from "styled-components";

const LoadBlock = styled.div`
    
`

const Loading = (): JSX.Element => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    const timer = setTimeout(()=>{
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  },[]);

  return(
    <LoadBlock className="loader-container">
        {isLoading ? 
            (<div className="loader">
                {/* <img src="/load.gif" alt="" /> */}
            </div>) 
        : null}
    </LoadBlock>
  )


}


export default Loading;
