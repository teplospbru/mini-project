interface User {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: string;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

interface Organization {
    avatar_url: string;
    description: string | null;
    events_url: string;
    hooks_url: string;
    id: number;
    issues_url: string;
    login: string;
    members_url: string;
    node_id: string;
    public_members_url: string;
    repos_url: string;
    url: string;
}