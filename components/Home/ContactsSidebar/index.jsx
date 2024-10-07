"use client";
import { Image } from '@chakra-ui/next-js';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FaUserPlus, FaCheck } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { pendingRequests, suggestedContacts ,myContactsList} from './ContactsData';

const RightSidebar = () => {
  const [contacts, setContacts] = useState(suggestedContacts);
  const [requests, setRequests] = useState(pendingRequests);
  const [myContacts, setMyContacts] = useState(myContactsList);
  const toast = useToast();

  const handleAddFriend = (id) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, requestSent: true } : contact
    ));
    // Logic to send friend request can be added here
    console.log(`Friend request sent to ${id}`);
    toast({
      title: "Friend Request Sent",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleAcceptRequest = (id) => {
    const acceptedRequest = requests.find(request => request.id === id);
    if (acceptedRequest) {
      setMyContacts(prevContacts => [...prevContacts, acceptedRequest]); // Add to contact list
      setRequests(requests.filter(request => request.id !== id)); // Remove from requests list
      toast({
        title: "Request Accepted",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleDeclineRequest = (id) => {
    setRequests(requests.filter(request => request.id !== id));
    toast({
      title: "Request Declined",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <div className="w-full h-full flex flex-col text-[rgba(255,255,255,0.69)]">
      
      {/* My Contacts List */}
      {myContacts.length > 0 && (
        <>
          <h2 className=" mb-4 text-sm font-thin">MY CONTACTS</h2>
          <div className="flex flex-col flex-grow  overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
            {myContacts.map(contact => (
              <div key={contact.id} className="flex items-center mb-3 px-3 py-2 bg-dark1 rounded-xl drop-shadow-md">
                <Image src={contact.dp} alt={contact.name} width={28} height={28} priority className="w-7 h-7 object-cover rounded-full mr-3" />
                <span className="flex-grow text-xs">{contact.name}</span>
              </div>
            ))}
          </div>
          </>
        
      )}

<div className="mt-5 border-t border-[rgb(50,50,50)] max-h-[250px]">
      <h2 className="mt-4 mb-4 text-sm font-thin">SUGGESTED CONTACTS</h2>
      <div className="overflow-y-scroll text-xs" style={{ scrollbarWidth: "none" }}>
        {contacts.map(contact => (
          <div key={contact.id} className="flex items-center mb-3 px-3 py-2.5 bg-dark1 rounded-xl drop-shadow-md">
            <Image src={contact.dp} alt={contact.name} width={28} height={28} priority className="w-7 h-7 object-cover rounded-full mr-3" />
            <span className="flex-grow">{contact.name}</span>
            {contact.requestSent ? (
              <div className='text-[rgba(255,255,255,0.69)] px-1 rounded-3xl py-0.5 border-[rgba(255,255,255,0.69)]'>Sent</div>
            ) : (
              <button onClick={() => handleAddFriend(contact.id)} className="text-gold" title="Add friend">
                <FaUserPlus />
              </button>
            )}
          </div>
        ))}
      </div>
      </div>

      

      {requests.length > 0 && (
        <div className="mt-5 border-t border-[rgb(50,50,50)] max-h-[250px]">
          <h2 className="mt-4 mb-4 text-sm font-thin">PENDING REQUESTS</h2>
          <div className="flex flex-col max-h-[200px] overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
            {requests.map(request => (
              <div key={request.id} className="flex items-center mb-3 px-3 py-2 bg-dark1 rounded-xl drop-shadow-md">
                <Image src={request.dp} alt={request.name} width={28} height={28} priority className="w-7 h-7 object-cover rounded-full mr-3" />
                <span className="flex-grow text-xs">{request.name}</span>
                <div className="flex gap-2 items-center text-xs">
                  <button onClick={() => handleAcceptRequest(request.id)} title="Accept" className="text-black bg-gold px-2 border border-gold py-1 rounded-3xl">
                    <FaCheck />
                  </button>
                  <button onClick={() => handleDeclineRequest(request.id)} title="Decline" className="text-[rgba(255,255,255,0.69)] px-2 rounded-3xl py-1 border border-[rgba(255,255,255,0.69)]">
                    <RxCross2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default RightSidebar;

