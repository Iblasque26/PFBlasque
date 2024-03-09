import { Curso } from "../../cursos/models";
import { User } from "../../users/modelos";

export interface Inscription {
    id: string | number;
    userId: string | number;
    courseId: string | number;
    user?: User;
    course?: Curso
}

export interface createInscriptionData {
    userId: string | number | null;
    courseId: string | number | null;
}