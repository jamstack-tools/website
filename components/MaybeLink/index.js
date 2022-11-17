import Link from 'next/link';

export default function MaybeLink({ href, as, children, ...other }) {
  return href ? (
    <Link legacyBehavior href={href} as={as}>
      <a {...other}>{children}</a>
    </Link>
  ) : (
    <div {...other}>{children}</div>
  );
}
