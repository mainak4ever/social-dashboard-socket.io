

"use client";

import { useState } from "react";
import { FaThumbsUp, FaComment, FaShare, FaTimes } from "react-icons/fa";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { HiPlusCircle } from "react-icons/hi";
import { VscSend } from "react-icons/vsc";
import { samplePosts } from "./samplePost";
import { useSelector } from "react-redux";




const PostsSection = () => {
    const [posts, setPosts] = useState(samplePosts);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [commentVisibility, setCommentVisibility] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const toast = useToast();
    const [newCommentText, setNewCommentText] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostDescription, setNewPostDescription] = useState("");
    const [newPostImage, setNewPostImage] = useState("");

    const { User } = useSelector((state) => state.user);



    const handleAddComment = (postId) => {
        if (newCommentText.trim() === "") return;

        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    comments: post.comments + 1,
                    commentList: [
                        ...post.commentList,
                        {
                            id: post.commentList.length + 1,
                            user: User.name,
                            avatar: User.avatar,
                            text: newCommentText,
                        }
                    ]
                }
                : post
        ));
        setNewCommentText("");
    };

    const handleExpandPost = (postId) => {
        console.log("expand post post id",postId)
        setExpandedPostId(postId);
        setCommentVisibility(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleCloseExpandedPost = () => {
        setExpandedPostId(null);
        // setCommentVisibility({})
    };

    const toggleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
                : post
        ));

    };

    const toggleComments = (postId) => {
        setCommentVisibility(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleSharePost = () => {
        toast({
            title: "Post Shared!",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-right"
        });
    };

    const handleCreatePost = () => {
        const newPost = {
            id: posts.length + 1,
            title: newPostTitle,
            description: newPostDescription,
            image: newPostImage,
            likes: 0,
            liked: false,
            comments: 0,
            shares: 0,
            commentList: [],
        };


        setPosts([newPost, ...posts]);

        toast({
            title: "Post Created!",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-right",
        });

        
        onClose();
        setNewPostTitle("");
        setNewPostDescription("");
        setNewPostImage("");
    };

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full py-0 px-4 h-full flex flex-col">
            
            <div className="flex justify-between items-center mb-4 p-3 rounded-[50px] bg-dark2">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-3/4 p-2 px-4 bg-dark1 text-white rounded-3xl"
                />
                <button className="mr-2 text-light rounded-full hover:text-gold" title="Create Post" onClick={onOpen}>
                    <HiPlusCircle size={34} />
                </button>
            </div>

            <h2 className="mb-4 text-lg font-semibold">POSTS</h2>

            {/* Posts List */}
            <div className="flex gap-8 flex-wrap">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className={`relative bg-dark2 rounded-xl shadow-lg overflow-hidden transition-all duration-600 ${expandedPostId === post.id ? "w-full flex-col" : "w-[calc(50%-32px)] flex-row flex"
                                }`}
                            
                            // onClick={() => expandedPostId === null && handleExpandPost(post.id)}
                        >
                            {/* Close Button for Expanded Post */}
                            {expandedPostId === post.id && (
                                <button
                                    className="absolute top-2.5 right-2.5 cursor-pointer bg-[rgba(255,255,255,0.14)] p-1 rounded-full z-10"
                                    onClick={handleCloseExpandedPost}
                                >
                                    <FaTimes className="text-[rgba(255,255,255,0.71)]" />
                                </button>
                            )}

                            {/* Post Image */}
                            {expandedPostId !== post.id && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-[160px] h-[160px] object-cover cursor-pointer  mr-4"
                                    onClick={() => handleExpandPost(post.id)}
                                />
                            )}

                            
                            <div className="flex-grow">

                                {expandedPostId !== post.id && (
                                    <div className="flex flex-row gap-6 p-3 h-[160px]">
                                        <div className="flex flex-col justify-center items-start h-full  gap-4" onClick={() => handleExpandPost(post.id)}>
                                            <h3 className="font-semibold cursor-pointer">{post.title}</h3>
                                            <div className=" border rounded-3xl px-3 cursor-pointer py-[4px] text-xs hover:bg-[rgb(225,160,38,.3)]" >Explore</div>
                                        </div>

                                        <div className="flex flex-col justify-between items-center h-full text-light text-xs">
                                            <div onClick={() => toggleLike(post.id)} title="Like" className=" flex flex-col gap-1 cursor-pointer items-center">
                                                <FaThumbsUp className={` ${post.liked ? 'text-red-500' : ''}`} />
                                                {post.likes}
                                            </div>
                                            <div onClick={() => handleExpandPost(post.id)} title="Comment" className="cursor-pointer flex flex-col gap-1 items-center">
                                                <FaComment className="" />
                                                {post.comments}
                                            </div>
                                            <div onClick={handleSharePost} title="Share" className="cursor-pointer flex flex-col gap-1 items-center">
                                                <FaShare className="" />
                                                {post.shares}
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {/* Expand Post Section */}
                                {expandedPostId === post.id ? (
                                    <div className="mt-2">


                                        <h3 className="font-semibold text-2xl px-4 mb-2">{post.title}</h3>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-[400px] mt-2 object-cover mb-2 "
                                        />
                                        <div className="p-4">

                                            <div className="flex justify-between items-center text-light">
                                                <div onClick={() => toggleLike(post.id)} className="cursor-pointer flex gap-1 items-center text-sm">
                                                    <FaThumbsUp className={` inline mr-1 ${post.liked ? 'text-red-500' : ''}`} />
                                                    {post.likes} Likes
                                                </div>
                                                <div onClick={() => toggleComments(post.id)} className="cursor-pointer flex gap-1 items-center text-sm">
                                                    <FaComment className="inline mr-1" />
                                                    {post.comments} Comments
                                                </div>
                                                <div onClick={handleSharePost} className="cursor-pointer flex gap-1 items-center text-sm">
                                                    <FaShare className="inline mr-1" />
                                                    {post.shares} Shares
                                                </div>
                                            </div>

                                            <div className="my-4 w-full">
                                                <h3 className="text-xl mt-8 mb-3 font-semibold  text-[rgba(255,255,255,0.77)]">Description</h3>
                                                <p className="mb-2 text-light max-h-[300px]" style={{ scrollbarWidth: "none" }}>{post.description}</p>
                                            </div>

                                            {/* Comments Section */}
                                            {commentVisibility[post.id] && (

                                                <div className="mt-8">
                                                    <h3 className="text-xl font-semibold text-[rgba(255,255,255,0.77)] pb-3 mb-3 border-b border-[rgb(50,50,50)]">Comments</h3>
                                                    <div className=" max-h-[300px] overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
                                                        {post.commentList && post.commentList.length > 0 ? (
                                                            post.commentList.map((comment) => {
                                                                console.log("comment ", comment)
                                                                return (

                                                                    <div key={comment.id} className="flex items-start mb-4">
                                                                        {/* Avatar */}
                                                                        <div className="p-1 rounded-full mr-2">
                                                                            <img
                                                                                src={comment.avatar}
                                                                                alt={comment.user}
                                                                                className="w-6 h-6 rounded-full  object-cover object-top"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            {/* User Name */}
                                                                            <p className="font text-gray-200 text-sm">{comment.user}</p>
                                                                            {/* Comment */}
                                                                            <p className="text-light text-gray-400 ">{comment.text}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        ) : (
                                                            <p className="text-light">No comments yet.</p>
                                                        )}
                                                    </div>
                                                    {/* Add comment section */}
                                                    <div className="mt-4 flex gap-3 items-center">


                                                        <img
                                                            src={User.avatar}
                                                            alt={User.name}
                                                            className="w-8 h-8 rounded-full  object-cover object-center"
                                                        />


                                                        <input
                                                            type="text"
                                                            placeholder="Add a comment..."
                                                            value={newCommentText}
                                                            onChange={(e) => setNewCommentText(e.target.value)}
                                                            className="w-[80%] flex-1 px-5 py-2 bg-[rgba(255,255,255,0.15)] text-white rounded-3xl"
                                                        />
                                                        <button
                                                            onClick={() => handleAddComment(post.id)}
                                                            className="p-2 text-white hover:bg-[rgba(255,255,255,0.15)] rounded-full"
                                                        >
                                                            <VscSend size={22} />
                                                        </button>
                                                    </div>
                                                </div>

                                            )}




                                        </div>
                                    </div>
                                ) : (
                                    // Overlay with icons if the post is not expanded
                                    // <div className="flex justify-between items-center mt-2 text-gray-400">
                                    //     <div onClick={() => toggleLike(post.id)}>
                                    //         <FaThumbsUp className={`inline mr-1 ${post.liked ? 'text-red-500' : ''}`} />
                                    //         {post.likes}
                                    //     </div>
                                    //     <div onClick={() => toggleComments(post.id)}>
                                    //         <FaComment className="inline mr-1" />
                                    //         {post.comments}
                                    //     </div>
                                    //     <div onClick={handleSharePost}>
                                    //         <FaShare className="inline mr-1" />
                                    //         {post.shares}
                                    //     </div>
                                    // </div>
                                    <></>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-light">No posts found matching your search.</p>
                )}
            </div>

            {/*  New Post Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="rgb(38,38,38)" color="white">
                    <ModalHeader color="rgb(225,160,38)">Create New Post</ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody>
                        <Input
                            placeholder="Post Title"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            mb={3}
                            bg="black"
                            color="white"
                            borderColor="transparent"
                            _placeholder={{ color: "gray" }}
                        />
                        <Textarea
                            placeholder="Post Description"
                            value={newPostDescription}
                            onChange={(e) => setNewPostDescription(e.target.value)}
                            mb={3}
                            bg="black"
                            color="white"
                            borderColor="transparent"
                            _placeholder={{ color: "gray" }}
                        />
                        <Input
                            placeholder="Image URL"
                            value={newPostImage}
                            onChange={(e) => setNewPostImage(e.target.value)}
                            mb={3}
                            bg="black"
                            color="white"
                            borderColor="transparent"
                            _placeholder={{ color: "gray" }}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="gray"
                            mr={3}
                            onClick={onClose}
                            bg="rgba(255,255,255,0.15)"
                            _hover={{ bg: "gray.600" }}
                            color={"white"}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="yellow"
                            bg="rgb(225,160,38)"
                            color="black"
                            _hover={{ bg: "rgb(255, 160, 38)" }}
                            onClick={handleCreatePost}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default PostsSection;

