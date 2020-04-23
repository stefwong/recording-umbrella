import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function ColumnHelper() {
    const largeDesktopMatches = useMediaQuery('(min-width:1500px)');
    const desktopMatches = useMediaQuery('(min-width:1000px)');
    const tabletMatches = useMediaQuery('(min-width: 500px)');

    //dynamic columns
    //default is 1, else, others depending on query
    let columns = 1
    if (largeDesktopMatches) columns = 4;
    else if (desktopMatches) columns = 3;
    else if (tabletMatches) columns = 2;
    return columns
}

