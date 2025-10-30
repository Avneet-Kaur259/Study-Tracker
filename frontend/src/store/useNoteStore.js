import { create } from 'zustand';
import api from '../lib/axios';
import toast from 'react-hot-toast';

export const useNoteStore = create((set) => ({
    notes: [],
    loading: true,
    isRateLimited: false,

    fetchNotes: async () => {
        try {
            set({ loading: true });
            set({ isRateLimited: false });
            const res = await api.get("/notes");
            console.log(res.data)
            set({ notes: res.data });
        } catch (error) {
            set({ notes: [] });
            console.log("Error fetching notes");
            console.log(error.response);
            if (error.response?.status === 429) {
                set({ isRateLimited: true });
            } else {
                toast.error(error.response.data.message || "Something went wrong");
            }
        } finally {
            set({ loading: false });
        }
    },

    handleDelete: async (e, id) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delte this note?")) return

        try {
            await api.delete(`/notes/${id}`)
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== id)
            }));
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log("Error in deleling note", error)
            toast.error(error.response.data.message || "Failed to delete note")
        }
    },
}));