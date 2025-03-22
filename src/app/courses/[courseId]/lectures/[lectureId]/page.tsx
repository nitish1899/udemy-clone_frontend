"use client";


import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const markComplete = async (lectureId : string) => {
    await axios.post('/api/lectures/complete', { lectureId });
    alert('Lecture marked as completed!');
};

interface Lecture {
    title: string;
    description: string;
    instructor:{name:string};
    videoUrl:string;
    lectures:{id:string,title:string}[]
  }

interface Comments {
    id:string;
    text:string;
}

export default function LecturePage() {
    const router = useRouter();
    const {lectureId } = router.query;
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [comments, setComments] = useState<Comments[]>([]);

    useEffect(() => {
        if (lectureId) {
            axios.get(`/api/lectures/${lectureId}`).then(response => {
                setLecture(response.data);
            });
            axios.get(`/api/lectures/${lectureId}/comments`).then(response => {
                setComments(response.data);
            });
        }
    }, [lectureId]);

    if (!lecture) return <p>Loading...</p>;

    return (
        <div>
            <h1>{lecture.title}</h1>
            <video controls src={lecture.videoUrl}></video>
            <button onClick={() => markComplete(lectureId as string)}>Mark as Completed</button>
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul>
        </div>
    );
}
