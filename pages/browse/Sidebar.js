import Link from 'next/link';
import ActiveLink from 'components/ActiveLink';
import LeftIcon from 'public/icons/regular/chevron-double-left.svg';
import s from './pageStyle.module.css';

export default function Sidebar() {
  const all = [
    { name: 'CMS', slug: 'headless-cms' },
    { name: 'Generators', slug: 'generators' },
    { name: 'Form', slug: 'all/form' },
    { name: 'Chat', slug: 'all/chat' },
    { name: 'Feedback', slug: 'all/feedback' },
    { name: 'Payment', slug: 'all/payment' },
    { name: 'Commerce', slug: 'all/commerce' },
    { name: 'Media', slug: 'all/media' },
    { name: 'Authentication', slug: 'all/authentication' },
  ];

  return (
    <>
      <Link href="/browse">
        <a className={s.backHome}>
          <LeftIcon /> Back
        </a>
      </Link>
      {all.map((category) => (
        <div key={category.slug}>
          <ActiveLink
            activeClassName={s.activePage}
            href={`/browse/${category.slug}`}
            as={`/browse/${category.slug}`}
            key={category.slug}
          >
            <a className={s.page}>{category.name}</a>
          </ActiveLink>
        </div>
      ))}
      <div style={{ height: '80px' }} />
    </>
  );
}
//
// const SidebarEntry = ({ url, level, label, children }) => {
//   if (!url && level === 0) {
//     return (
//       <>
//         <div className={s.subgroupName}>{label}</div>
//         {children && children.length > 0 && (
//           <div className={cn(s.pageChildren, s[`pageChildrenLevel${level}`])}>
//             {children.map((entry) => (
//               <SidebarEntry key={entry.slug} level={level + 1} {...entry} />
//             ))}
//           </div>
//         )}
//       </>
//     );
//   }
//
//   return (
//     <div>
//       {url ? (
//         <ActiveLink href={url} as={url} activeClassName={s.activePage}>
//           <a className={cn(s.page, s[`page-level${level}`])}>{label}</a>
//         </ActiveLink>
//       ) : (
//         <span className={cn(s.page, s[`page-level${level}`])}>{label}</span>
//       )}
//       {children && children.length > 0 && (
//         <div className={cn(s.pageChildren, s[`pageChildrenLevel${level}`])}>
//           {children.map((entry) => (
//             <SidebarEntry key={entry.url} level={level + 1} {...entry} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default function Sidebar({ title, tools }) {
//   const collect = tools.reduce((acc, entry) => {
//     const label = entry.category ? entry.category.name : entry.name;
//
//     if (acc[label]) {
//       acc[label] << entry;
//     } else {
//       acc = { ...acc, [label]: [entry] };
//     }
//
//     return acc;
//   }, {});
//
//   return (
//     <>
//       <Link href="/browse">
//         <a className={s.backHome}>
//           <LeftIcon /> Home
//         </a>
//       </Link>
//
//       {Object.entries(collect).map(([category, entries]) => (
//         <SidebarEntry key={category} level={0} children={entries} />
//       ))}
//
//       <div style={{ height: '80px' }} />
//     </>
//   );
// }
