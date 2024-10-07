import React from 'react';
import { FaPlus } from 'react-icons/fa';
import EventsSidebar from './EventSidebar';
import ContactsSidebar from './ContactsSidebar';
import PostsSection from './PostsSection';

function Home() {


  return (
    <>
      <div className="flex h-full">
        
        <div className="w-1/5  p-4 bg-dark2 overflow-y-hidden" style={{scrollbarWidth: "none"}}>
        <EventsSidebar/>
        </div>
        
        <div className="w-3/5  p-4 bg-dark1 overflow-y-scroll" style={{scrollbarWidth: "none"}} >
          <PostsSection/>
        </div>

        
        <div className="w-1/5  p-4 bg-dark2 overflow-y-hidden " style={{scrollbarWidth: "none"}}>
          <ContactsSidebar/>
        </div>
      </div>
    </>
  );
}

export default Home;
