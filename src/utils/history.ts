import { auth } from "@/firebaseConfig";

export async function fetchHistory(userId: string, type: 'all' | 'summaries' | 'highlights' = 'all') {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  const token = await user.getIdToken();
  const response = await fetch(`/api/history?type=${type}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  
  return response.json();
}