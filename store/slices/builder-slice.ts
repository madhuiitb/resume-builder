import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Education, Experience, Resume,Project } from "@/features/builder/types/resume";

interface BuilderState{
    resume:Resume;
    activeSection:string;
    selectedTemplates:string;
    isDirty:boolean
}

const initialState:BuilderState = {
    resume:{
        id:"new",
        title:"Untitled Resume",

        personalInfo:{
             fullName:"",
                email:"",
                phone:"",
                location:"",
                linkedin:"",
                website:"",       
        },
        summary:"",
        experience:[],
        education:[],
        skills:[],
        projects:[],
    },
    activeSection:"personal-info",
    selectedTemplates:"classic",
    isDirty:false,
};

const builderSlice = createSlice({
    name:"builder",
    initialState,
    reducers:{
        updatePersonalInfo(
            state,
            action:PayloadAction<Partial<Resume["personalInfo"]>>,
        ){
            state.resume.personalInfo={
                ...state.resume.personalInfo,
                ...action.payload
            };
            state.isDirty = true;
        },
        updateSummary(state,action:PayloadAction<string>){
            state.resume.summary=action.payload;
            state.isDirty = true;
        },
        addExperience(state, action:PayloadAction<Experience>){
            state.resume.experience.push(action.payload);
            state.isDirty = true;
        },
        updateExperience(state, action:PayloadAction<{
            id:string;
            data:Partial<Experience>
        }>){
            const experience = state.resume.experience.find(
                (item)=>item.id===action.payload.id
            );
            if(experience){
                Object.assign(experience, action.payload.data);
            }
            state.isDirty = true;
        },
        removeExperience(state, action:PayloadAction<string>){
            state.resume.experience = state.resume.experience.filter(
                (item)=>item.id!==action.payload
            );
            state.isDirty = true;
        },

        addEducation(state,action:PayloadAction<Education>){
            state.resume.education.push(action.payload);
            state.isDirty = true;
        },
        updateEducation(state, action:PayloadAction<{
            id:string;
            data:Partial<Education>
        }>){
            const education = state.resume.education.find(
                (item)=>item.id===action.payload.id
            );
            if(education){
                Object.assign(education,action.payload.data);
            }
            state.isDirty = true;
        },
        removeEducation(state,action:PayloadAction<string>){
            state.resume.education = state.resume.education.filter(
                (item)=>item.id!==action.payload
            );
            state.isDirty = true;
        },
         updateSkills(state, action: PayloadAction<string[]>) {
            state.resume.skills = action.payload;
            state.isDirty = true;
        },

        addProject(state, action: PayloadAction<Project>) {
            state.resume.projects.push(action.payload);
            state.isDirty = true;
        },

        updateProject(
            state,
            action: PayloadAction<{
                id: string;
                data: Partial<Project>;
        }>,
        ) {
        const project = state.resume.projects.find(
            (item) => item.id === action.payload.id,
        );

        if (project) {
            Object.assign(project, action.payload.data);
        }

        state.isDirty = true;
        },

        removeProject(state, action: PayloadAction<string>) {
            state.resume.projects = state.resume.projects.filter(
            (item) => item.id !== action.payload,
        );

            state.isDirty = true;
        },

        setActiveSection(state, action:PayloadAction<string>){
            state.activeSection = action.payload;
        },

        setTemplate(state, action:PayloadAction<string>){
            state.selectedTemplates = action.payload;
            state.isDirty = true;
        },
        loadBuilder(
            state,
            action: PayloadAction<{
                resume: Resume;
                selectedTemplate: string;
            }>,
        ) {
            state.resume = action.payload.resume;
            state.selectedTemplates = action.payload.selectedTemplate;
            state.isDirty = false;
        },

    // NEW
        markSaved(state) {
            state.isDirty = false;
        },
    },
});

export const {
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    addProject,
    updateProject,
    removeProject,
    setActiveSection,
    setTemplate,
    loadBuilder,
    markSaved
} = builderSlice.actions;

export default builderSlice.reducer;