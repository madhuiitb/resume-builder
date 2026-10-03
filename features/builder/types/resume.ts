export interface PersonalInfo{
    fullName:string;
    email:string;
    phone:string;
    location:string;
    linkedin:string;
    website:string
}

export interface Experience{
    id:string;
    company:string;
    role:string;
    location:string;
    startDate:string;
    endDate:string;
    current:boolean;
    description:string;
}

export interface Education{
    id:string;
    institution:string;
    degree:string;
    field:string;
    startDate:string;
    endDate:string;
}

export interface Project{
    id:string;
    name:string;
    description:string;
    technologies:string[];
    url:string
}

export interface Resume{
    id:string;
    title:string;

    personalInfo:PersonalInfo;
    summary:string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects:Project[];
}