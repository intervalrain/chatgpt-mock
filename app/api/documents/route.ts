import { DocumentResponse, DSM } from '@/app/types';
import { api } from '../auth/[...nextauth]/route';

export const getDocuments = async(): Promise<DSM[]> => {
  try {
    const response = await api.get<DocumentResponse>('/Document/getDocuments');
    console.log(response.data);
    return response.data.documents;
  }
  catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}
