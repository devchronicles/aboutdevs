export interface TagSearchResult {
    has_more?: boolean;
    items: Item[];
    quota_max?: number;
    quota_remaining?: number;
}

export interface Item {
    count: number;
    has_synonyms: boolean;
    is_moderator_only: boolean;
    is_required: boolean;
    name: string;
}
