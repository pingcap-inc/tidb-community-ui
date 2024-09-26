import useSWR from 'swr'
import { useContext } from 'react'
import SiteComponentsContext from '../context/site-components-context'
import { SWRResponse } from 'swr/dist/types'

type ApiResponse<T, Detail> = {
  detail: Detail;
} & T;

interface PageData<T, Key extends string> {
  data: {
    meta: {
      page: number;
      page_size: number;
    } & Record<`${Key}_count`, number>;
  } & Record<Key, T[]>;
}

export type MeData = {
  data: {
    id: number;
    username: string;
    avatar_url: string;
    org: {
      slug: string;
      role: string;
    };
    org_enroll?: {
      audit_status: number;
      audit_status_display: string;
      audit_reason: string;
    };
    org_invitations?: {
      org_name: string;
      org_slug: string;
      org_company: string;
      inviter_username: string;
      valid: boolean;
    }[];
  }
}

export const useMeData = (): SWRResponse<ApiResponse<MeData, void>> => {
  const { fetchers: { accounts: fetcher } } = useContext(SiteComponentsContext)
  return useSWR<ApiResponse<MeData, void>>(['me'], { fetcher })
}

export interface ITopItem {
  ranking: number // 1,
  user: {
    username: string // "h5n1",
    avatar_url: string // "https://asktug.com/user_avatar/asktug.com/h5n1/50/154936_2.png"
  },
  exps: number // 41333
}

export interface ITop {
  limit: number // 50,
  period: string // "all"
  data: ITopItem[]
}

export interface IPointsMe {
  "detail": string // "success",
  "data": {
    "current_level": number // 4,
    "current_points": number // 375,
    "current_exps": number // 245,
    "current_rank": number // 3029,
    "is_today_checked": boolean // false,
    "level_desc": {
      "min_exps": number // 200,
      "max_exps": number // 499,
      "progress": number // 0.1505
    }
  }
}

export const usePointTop = (): SWRResponse<ApiResponse<ITop, void>> => {
  const { fetchers: { accounts: fetcher } } = useContext(SiteComponentsContext)
  return useSWR<ApiResponse<ITop, void>>(['accounts.points.top'], { fetcher })
}

export const usePointMe = (): SWRResponse<ApiResponse<IPointsMe, void>> => {
  const { fetchers: { accounts: fetcher } } = useContext(SiteComponentsContext)
  return useSWR<ApiResponse<IPointsMe, void>>(['accounts.points.me'], { fetcher })
}
