/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\tquery About {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\taboutPage {\n\t\t\tvideo_embed_url\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AboutDocument,
    "\n\tfragment Clients on Homepage {\n\t\tclients {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ClientsFragmentDoc,
    "\n\tfragment Contact on Homepage {\n\t\toffice_location {\n\t\t\tid\n\t\t\tname\n\t\t\tgoogle_maps_iframe_url\n\t\t\taddress\n\t\t\tphone\n\t\t\temergency_phone\n\t\t\temail\n\t\t\temail_subject\n\t\t\temail_body\n\t\t}\n\t}\n": typeof types.ContactFragmentDoc,
    "\n\tquery Contact {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\thomepage {\n\t\t\t...Contact\n\t\t}\n\t}\n": typeof types.ContactDocument,
    "\n\tfragment FeaturedProjects on Homepage {\n\t\tfeatured_projects {\n\t\t\tdocumentId\n\t\t\t...ProjectCard\n\t\t}\n\t}\n": typeof types.FeaturedProjectsFragmentDoc,
    "\n\tfragment Hero_query on Query {\n\t\t...ServicesDropdown_query\n\t\t...Navigation_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\thomepage {\n\t\t\tsubtitle\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tbackground {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": typeof types.Hero_QueryFragmentDoc,
    "\n\tquery NotFound {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n": typeof types.NotFoundDocument,
    "\n\tquery Homepage {\n\t\thomepage {\n\t\t\t...Clients\n\t\t\t...FeaturedProjects\n\t\t\t...Contact\n\n\t\t\tmission_statement\n\t\t}\n\t\t...Partners_query\n\t\t...Hero_query\n\t\t...Footer_query\n\t}\n": typeof types.HomepageDocument,
    "\n\tfragment Partners_query on Query {\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": typeof types.Partners_QueryFragmentDoc,
    "\n\tquery ProjectPage($id: ID!) {\n\t\tcurrentProject: project(documentId: $id) {\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tbudget\n\t\t\tindustry\n\t\t\tdescription\n\t\t\tlocation\n\n\t\t\timages {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n": typeof types.ProjectPageDocument,
    "\n\tfragment ProjectGallery_query on Query {\n\t\tprojects(pagination: { limit: 25 }) {\n\t\t\t...ProjectCard\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tindustry\n\t\t\tlocation\n\t\t\tbudget\n\t\t\torder\n\t\t\tcreatedAt\n\t\t}\n\t}\n": typeof types.ProjectGallery_QueryFragmentDoc,
    "\n\tquery ProjectsPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t\tprojectsPage {\n\t\t\tdescription\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ProjectsPageDocument,
    "\n\tquery ServiceRequestPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t}\n": typeof types.ServiceRequestPageDocument,
    "\n\tquery ServicePage($name: String!) {\n\t\tcurrentPage: servicePages(filters: { url: { eq: $name } }) {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n": typeof types.ServicePageDocument,
    "\n\tfragment ContentBlock on ComponentContentContentBlock {\n\t\tid\n\t\theading\n\t\tsubheading\n\t\timage {\n\t\t\t...Upload\n\t\t}\n\t\timage_fit\n\t\timage_side\n\t\ttwo_column_lists\n\t\tcontent\n\t}\n": typeof types.ContentBlockFragmentDoc,
    "\n\tfragment Footer_query on Query {\n\t\thomepage {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t}\n\t}\n": typeof types.Footer_QueryFragmentDoc,
    "\n\tfragment Navigation_query on Query {\n\t\t...ServicesDropdown_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": typeof types.Navigation_QueryFragmentDoc,
    "\n\tfragment ProjectCard on Project {\n\t\tdocumentId\n\t\ttitle\n\t\tthumbnail {\n\t\t\t...Upload\n\t\t}\n\t\tindustry\n\t}\n": typeof types.ProjectCardFragmentDoc,
    "\n\tfragment ServicesDropdown_query on Query {\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t}\n": typeof types.ServicesDropdown_QueryFragmentDoc,
    "\n\tfragment Upload on UploadFile {\n\t\talternativeText\n\t\twidth\n\t\theight\n\t\turl\n\t}\n": typeof types.UploadFragmentDoc,
};
const documents: Documents = {
    "\n\tquery About {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\taboutPage {\n\t\t\tvideo_embed_url\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t}\n": types.AboutDocument,
    "\n\tfragment Clients on Homepage {\n\t\tclients {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": types.ClientsFragmentDoc,
    "\n\tfragment Contact on Homepage {\n\t\toffice_location {\n\t\t\tid\n\t\t\tname\n\t\t\tgoogle_maps_iframe_url\n\t\t\taddress\n\t\t\tphone\n\t\t\temergency_phone\n\t\t\temail\n\t\t\temail_subject\n\t\t\temail_body\n\t\t}\n\t}\n": types.ContactFragmentDoc,
    "\n\tquery Contact {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\thomepage {\n\t\t\t...Contact\n\t\t}\n\t}\n": types.ContactDocument,
    "\n\tfragment FeaturedProjects on Homepage {\n\t\tfeatured_projects {\n\t\t\tdocumentId\n\t\t\t...ProjectCard\n\t\t}\n\t}\n": types.FeaturedProjectsFragmentDoc,
    "\n\tfragment Hero_query on Query {\n\t\t...ServicesDropdown_query\n\t\t...Navigation_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\thomepage {\n\t\t\tsubtitle\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tbackground {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": types.Hero_QueryFragmentDoc,
    "\n\tquery NotFound {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n": types.NotFoundDocument,
    "\n\tquery Homepage {\n\t\thomepage {\n\t\t\t...Clients\n\t\t\t...FeaturedProjects\n\t\t\t...Contact\n\n\t\t\tmission_statement\n\t\t}\n\t\t...Partners_query\n\t\t...Hero_query\n\t\t...Footer_query\n\t}\n": types.HomepageDocument,
    "\n\tfragment Partners_query on Query {\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": types.Partners_QueryFragmentDoc,
    "\n\tquery ProjectPage($id: ID!) {\n\t\tcurrentProject: project(documentId: $id) {\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tbudget\n\t\t\tindustry\n\t\t\tdescription\n\t\t\tlocation\n\n\t\t\timages {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n": types.ProjectPageDocument,
    "\n\tfragment ProjectGallery_query on Query {\n\t\tprojects(pagination: { limit: 25 }) {\n\t\t\t...ProjectCard\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tindustry\n\t\t\tlocation\n\t\t\tbudget\n\t\t\torder\n\t\t\tcreatedAt\n\t\t}\n\t}\n": types.ProjectGallery_QueryFragmentDoc,
    "\n\tquery ProjectsPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t\tprojectsPage {\n\t\t\tdescription\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": types.ProjectsPageDocument,
    "\n\tquery ServiceRequestPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t}\n": types.ServiceRequestPageDocument,
    "\n\tquery ServicePage($name: String!) {\n\t\tcurrentPage: servicePages(filters: { url: { eq: $name } }) {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n": types.ServicePageDocument,
    "\n\tfragment ContentBlock on ComponentContentContentBlock {\n\t\tid\n\t\theading\n\t\tsubheading\n\t\timage {\n\t\t\t...Upload\n\t\t}\n\t\timage_fit\n\t\timage_side\n\t\ttwo_column_lists\n\t\tcontent\n\t}\n": types.ContentBlockFragmentDoc,
    "\n\tfragment Footer_query on Query {\n\t\thomepage {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t}\n\t}\n": types.Footer_QueryFragmentDoc,
    "\n\tfragment Navigation_query on Query {\n\t\t...ServicesDropdown_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n": types.Navigation_QueryFragmentDoc,
    "\n\tfragment ProjectCard on Project {\n\t\tdocumentId\n\t\ttitle\n\t\tthumbnail {\n\t\t\t...Upload\n\t\t}\n\t\tindustry\n\t}\n": types.ProjectCardFragmentDoc,
    "\n\tfragment ServicesDropdown_query on Query {\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t}\n": types.ServicesDropdown_QueryFragmentDoc,
    "\n\tfragment Upload on UploadFile {\n\t\talternativeText\n\t\twidth\n\t\theight\n\t\turl\n\t}\n": types.UploadFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery About {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\taboutPage {\n\t\t\tvideo_embed_url\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery About {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\taboutPage {\n\t\t\tvideo_embed_url\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Clients on Homepage {\n\t\tclients {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Clients on Homepage {\n\t\tclients {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Contact on Homepage {\n\t\toffice_location {\n\t\t\tid\n\t\t\tname\n\t\t\tgoogle_maps_iframe_url\n\t\t\taddress\n\t\t\tphone\n\t\t\temergency_phone\n\t\t\temail\n\t\t\temail_subject\n\t\t\temail_body\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Contact on Homepage {\n\t\toffice_location {\n\t\t\tid\n\t\t\tname\n\t\t\tgoogle_maps_iframe_url\n\t\t\taddress\n\t\t\tphone\n\t\t\temergency_phone\n\t\t\temail\n\t\t\temail_subject\n\t\t\temail_body\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Contact {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\thomepage {\n\t\t\t...Contact\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Contact {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\thomepage {\n\t\t\t...Contact\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment FeaturedProjects on Homepage {\n\t\tfeatured_projects {\n\t\t\tdocumentId\n\t\t\t...ProjectCard\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment FeaturedProjects on Homepage {\n\t\tfeatured_projects {\n\t\t\tdocumentId\n\t\t\t...ProjectCard\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Hero_query on Query {\n\t\t...ServicesDropdown_query\n\t\t...Navigation_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\thomepage {\n\t\t\tsubtitle\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tbackground {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Hero_query on Query {\n\t\t...ServicesDropdown_query\n\t\t...Navigation_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\thomepage {\n\t\t\tsubtitle\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tbackground {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery NotFound {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n"): (typeof documents)["\n\tquery NotFound {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Homepage {\n\t\thomepage {\n\t\t\t...Clients\n\t\t\t...FeaturedProjects\n\t\t\t...Contact\n\n\t\t\tmission_statement\n\t\t}\n\t\t...Partners_query\n\t\t...Hero_query\n\t\t...Footer_query\n\t}\n"): (typeof documents)["\n\tquery Homepage {\n\t\thomepage {\n\t\t\t...Clients\n\t\t\t...FeaturedProjects\n\t\t\t...Contact\n\n\t\t\tmission_statement\n\t\t}\n\t\t...Partners_query\n\t\t...Hero_query\n\t\t...Footer_query\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Partners_query on Query {\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Partners_query on Query {\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ProjectPage($id: ID!) {\n\t\tcurrentProject: project(documentId: $id) {\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tbudget\n\t\t\tindustry\n\t\t\tdescription\n\t\t\tlocation\n\n\t\t\timages {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n"): (typeof documents)["\n\tquery ProjectPage($id: ID!) {\n\t\tcurrentProject: project(documentId: $id) {\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tbudget\n\t\t\tindustry\n\t\t\tdescription\n\t\t\tlocation\n\n\t\t\timages {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment ProjectGallery_query on Query {\n\t\tprojects(pagination: { limit: 25 }) {\n\t\t\t...ProjectCard\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tindustry\n\t\t\tlocation\n\t\t\tbudget\n\t\t\torder\n\t\t\tcreatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment ProjectGallery_query on Query {\n\t\tprojects(pagination: { limit: 25 }) {\n\t\t\t...ProjectCard\n\t\t\tdocumentId\n\t\t\ttitle\n\t\t\tindustry\n\t\t\tlocation\n\t\t\tbudget\n\t\t\torder\n\t\t\tcreatedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ProjectsPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t\tprojectsPage {\n\t\t\tdescription\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery ProjectsPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t\tprojectsPage {\n\t\t\tdescription\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ServiceRequestPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t}\n"): (typeof documents)["\n\tquery ServiceRequestPage {\n\t\t...Navigation_query\n\t\t...Footer_query\n\t\t...ProjectGallery_query\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery ServicePage($name: String!) {\n\t\tcurrentPage: servicePages(filters: { url: { eq: $name } }) {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n"): (typeof documents)["\n\tquery ServicePage($name: String!) {\n\t\tcurrentPage: servicePages(filters: { url: { eq: $name } }) {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\theader {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t\tblocks {\n\t\t\t\tid\n\t\t\t\t...ContentBlock\n\t\t\t}\n\t\t}\n\t\t...Navigation_query\n\t\t...Footer_query\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment ContentBlock on ComponentContentContentBlock {\n\t\tid\n\t\theading\n\t\tsubheading\n\t\timage {\n\t\t\t...Upload\n\t\t}\n\t\timage_fit\n\t\timage_side\n\t\ttwo_column_lists\n\t\tcontent\n\t}\n"): (typeof documents)["\n\tfragment ContentBlock on ComponentContentContentBlock {\n\t\tid\n\t\theading\n\t\tsubheading\n\t\timage {\n\t\t\t...Upload\n\t\t}\n\t\timage_fit\n\t\timage_side\n\t\ttwo_column_lists\n\t\tcontent\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Footer_query on Query {\n\t\thomepage {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Footer_query on Query {\n\t\thomepage {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t\tpartners {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\tlink\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Navigation_query on Query {\n\t\t...ServicesDropdown_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Navigation_query on Query {\n\t\t...ServicesDropdown_query\n\t\tnavigation {\n\t\t\tlogo {\n\t\t\t\t...Upload\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment ProjectCard on Project {\n\t\tdocumentId\n\t\ttitle\n\t\tthumbnail {\n\t\t\t...Upload\n\t\t}\n\t\tindustry\n\t}\n"): (typeof documents)["\n\tfragment ProjectCard on Project {\n\t\tdocumentId\n\t\ttitle\n\t\tthumbnail {\n\t\t\t...Upload\n\t\t}\n\t\tindustry\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment ServicesDropdown_query on Query {\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment ServicesDropdown_query on Query {\n\t\tservicePages {\n\t\t\tdocumentId\n\t\t\tname\n\t\t\turl\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Upload on UploadFile {\n\t\talternativeText\n\t\twidth\n\t\theight\n\t\turl\n\t}\n"): (typeof documents)["\n\tfragment Upload on UploadFile {\n\t\talternativeText\n\t\twidth\n\t\theight\n\t\turl\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;