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
  const { fetchers: { accounts } } = useContext(SiteComponentsContext)
  return useSWR<ApiResponse<MeData, void>>(['me'], { fetcher: accounts })
}
