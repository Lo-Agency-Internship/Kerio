import * as React from 'react';
import classNames from 'classnames';

export interface SidebarLinkProps {
	isGroupLink?: boolean;
	icon?: React.ReactNode;
	children: React.ReactNode;
	active?: boolean;
	sidebarExpanded: boolean;
	onClick?: any;
	className?: string;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
	children,
	isGroupLink,
	active,
	icon,
	sidebarExpanded,
	onClick,
	className,
}) => {
	const linkClassnames = classNames('last:mb-0', {
		' px-1  py-2  rounded-sm  mb-0.5': !isGroupLink,
		' mb-1': isGroupLink,
	});

	const textClassnames = classNames(
		{
			'text-sm font-medium ltr:ml-3 rtl:mr-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-indigo-500':
				active,
			'text-sm font-medium ltr:ml-3 rtl:mr-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200':
				!active,
		},
		{
			'lg:opacity-100': sidebarExpanded,
		},
	);

	if (!children || !(children as any).props.children) {
		throw new Error(
			'You should provide a children with another children inside it. Example <a><span>Anchor</span></a>',
		);
	}

	return (
		<li className={linkClassnames}>
			<React.Fragment>
				{React.cloneElement(children as any, {
					className: `block  text-slate-200 hover:text-white  truncate  transition  duration-150 ${className}`,
					children: (
						<div className=" flex  items-center  justify-between" onClick={onClick}>
							<div className=" grow  flex  items-center">
								{icon || null}
								<span className={textClassnames}>{(children as any).props.children}</span>
							</div>
						</div>
					),
				})}
			</React.Fragment>
		</li>
	);
};
