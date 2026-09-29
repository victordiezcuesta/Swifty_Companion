export interface Skill
{
	id: number;
	name: string;
	level: number;
}

export interface ProjectUser
{
	id: number;
	final_mark: number | null;
	status: string;
	'validated?': boolean | null;
	project: { name: string };
}

export interface User
{
	login: string;
	displayname: string;
	email: string;
	wallet: number;
	correction_point: number;
	location: string | null;
	image: { link: string | null };
	cursus_users: { cursus_id: number; level: number; skills: Skill[] }[];
	projects_users: ProjectUser[];
}