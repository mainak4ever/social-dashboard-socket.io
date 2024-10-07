
"use client";
import { useState ,useEffect,useRef} from 'react';
import { FaCalendarAlt, FaRocket, FaGraduationCap, FaUsers } from 'react-icons/fa';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { io } from 'socket.io-client';

let socket;

const eventCategories = [
  { label: 'Meeting', value: 'meeting', icon: <FaCalendarAlt /> },
  { label: 'Launch', value: 'launch', icon: <FaRocket /> },
  { label: 'Workshop', value: 'workshop', icon: <FaGraduationCap /> },
  { label: 'Team Building', value: 'team', icon: <FaUsers /> },
];

const sampleEvents = [
  { id: 1, title: 'Team Meeting', description: 'Discuss project updates', category: 'meeting', icon: <FaCalendarAlt /> },
  { id: 2, title: 'Product Launch', description: 'Launch the new product', category: 'launch', icon: <FaRocket /> },
  { id: 3, title: 'Workshop on AI', description: 'Learn about AI technologies', category: 'workshop', icon: <FaGraduationCap /> },
  { id: 4, title: 'Team Building Activity', description: 'Fun activities to bond', category: 'team', icon: <FaUsers /> },
];

const EventsSidebar = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store clicked event
  const [newEvent, setNewEvent] = useState({ title: '', description: '', category: '' });
  const socketRef = useRef(null);
  // socketRef.current.on("chat", handleMessage)
  useEffect(() => {
   
    socketRef.current = io('http://localhost:3000/api/socket');

    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socketRef.current.on('notification', (data) => {
      console.log('New notification:', data);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.category) {
      const selectedCategory = eventCategories.find(cat => cat.value === newEvent.category);
      const createdEvent = { id: events.length + 1, ...newEvent, icon: selectedCategory.icon };
      setEvents([...events, createdEvent]);
      setNewEvent({ title: '', description: '', category: '' });
      setIsOpen(false);

      socketRef.current.emit('notification', {
        message: `A new event titled "${newEvent.title}" has been created.`,
        event: createdEvent,
      });
    }
  };

  const handleOpenEventDetails = (event) => {
    setSelectedEvent(event); // Set the selected event
  };

  const handleCloseEventDetails = () => {
    setSelectedEvent(null); // Clear the selected event when modal is closed
  };

  return (
    <div className="w-full pb-2 h-full flex flex-col text-white">
     
      <h2 className="mb-4 text-sm text-[rgba(255,255,255,0.69)]">EVENTS</h2>

      <ul className="list-none flex flex-col gap-4 p-0 h-[90%] overflow-y-auto" style={{scrollbarWidth: "none"}}>
        {events.map((event) => (
          <li
            key={event.id}
            className="flex gap-4 items-center px-[15px] group py-[9px] text-[rgba(255,255,255,0.69)] bg-black rounded-xl shadow border border-black  hover:cursor-pointer  hover:border-gold"
            onClick={() => handleOpenEventDetails(event)} 
          >
            <span className="text-[16px] font-thin group-hover:text-gold">{event.icon}</span>
            <div>
              <span className="text-sm font-thin">{event.title}</span>
              {/* <p className="text-sm">{event.description}</p> */}
            </div>
          </li>
        ))}
      </ul>
      
      <div className='border-t border-[rgb(50,50,50)] w-full'>
        <Button 
          colorScheme="yellow" 
          onClick={() => setIsOpen(true)}
          className="bg-gold text-black hover:bg-yellow-600 rounded-3xl mt-6 w-full "
        >
          + Create Event
        </Button>
      </div>

      {/* Create Event Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent className='bg-dark2'>
          <ModalHeader>Create a New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel color="rgb(254,160,38)">Category</FormLabel>
              <Select
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                className='bg-dark1 border-none'
                color="white"
              >
                <option value="" disabled>Select Category</option>
                {eventCategories.map((category) => (
                  <option key={category.value} value={category.value} className='text-black'>
                    {category.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb={3}>
              <FormLabel color="rgb(225,160,38)">Event Title</FormLabel>
              <Input
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className='bg-dark1 border-none'
                color="white"
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel color="rgb(225,160,38)">Event Description</FormLabel>
              <Textarea
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className='bg-dark1 border-none'
                color="white"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={handleCreateEvent} mr={3} bg="rgb(225,160,38)" color="black">
              Save Event
            </Button>
            <Button colorScheme="red" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal isOpen={!!selectedEvent} onClose={handleCloseEventDetails}>
          <ModalOverlay />
          <ModalContent className='bg-dark2'>
            <ModalHeader>{selectedEvent.title}{" ("}{selectedEvent.category}{")"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='flex flex-col gap-2'>

              {/* <p>Category : {selectedEvent.category}</p> */}

              <h3 className='text-xl font-semibold pb-2 '>Description</h3>
              <div className='p-4 bg-dark1 text-light rounded-md min-h-24'>
              <p className=''>{selectedEvent.description}</p>
              </div>
              
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="yellow" onClick={handleCloseEventDetails} bg="rgb(225,160,38)" color="black">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default EventsSidebar;
