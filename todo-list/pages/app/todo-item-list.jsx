import { CheckIcon, TrashIcon, XMarkIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

const TodoItemList = ({ items, updateItem, removeItem }) => {

    function changeItem(item, bool) {
        item.check = bool;
        updateItem(item);
    }
    function deleteItem(item) {
        removeItem(item);
    }

    return (
        <div>
            <ul className="list-decimal *:rounded-full *:border *:border-sky-400 *:bg-sky-200 *:px-2 *:py-0.5 *:w-60 *:mt-2">
                {
                    items.map(item =>
                        <li className='group relative' key={item.id}>
                            <span className={clsx(item.check && 'line-through')}>{item.text}</span>
                            <span className='hidden group-hover:inline-block absolute right-2'>
                                <CheckIcon className={clsx('w-4 h-4 inline mr-2 text-gray-600 cursor-pointer', item.check && 'hidden')} onClick={changeItem.bind(null, item, true)} />
                                <XMarkIcon className={clsx('w-4 h-4 inline mr-2 text-gray-600 cursor-pointer', !item.check && 'hidden')} onClick={changeItem.bind(null, item, false)} />
                                <TrashIcon className='w-4 h-4 inline text-gray-600 cursor-pointer' onClick={deleteItem.bind(null, item)} />
                            </span>
                        </li>)
                }
            </ul>
        </div>
    );
};

export default TodoItemList;