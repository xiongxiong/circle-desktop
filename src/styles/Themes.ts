export interface ITheme {
    color: {
        indigo: string,
        white: string,
        mariner: string,
        periwinkle: string,
        mercury: string,
        light_gray: string,
        carolina_blue: string,
        red: string,
        coral: string,
        tacao: string,
        blue_chill: string,
        montana: string,
        jumbo: string,
    },
    font_size: {
        xxs: string,
        xs: string,
        s: string,
        m: string,
        l: string,
        xl: string,
        xxl: string,
    },
    icon_size: {
        xxs: number,
        xs: number,
        s: number,
        m: number,
        l: number,
        xl: number,
        xxl: number,
    },
}

export const themeDefault: ITheme = {
    color: {
        indigo: '#586FBE',
        white: '#FFFFFF',
        mariner: '#485DA2',
        periwinkle: '#CCD2E8',
        mercury: '#E5E4E5',
        light_gray: '#D6D5D6',
        carolina_blue: '#8FB7D6',
        red: '#FD0013',
        coral: '#F6B57B',
        tacao: '#F87652',
        blue_chill: '#0F8687',
        montana: '#3A3A3A',
        jumbo: '#878787',
    },
    font_size: {
        xxs: '8px',
        xs: '10px',
        s: '12px',
        m: '14px',
        l: '16px',
        xl: '18px',
        xxl: '20px',
    },
    icon_size: {
        xxs: 10,
        xs: 12,
        s: 14,
        m: 16,
        l: 18,
        xl: 20,
        xxl: 22,
    },
}

export const priorityColors = ['#CCD2E8', '#F4E9C9', '#F6B57B', '#F87652'];