import React from 'react'

export default function MiniTable() {
    const people = [
        {
            id: '101',
            title: 'Contest',
            score: '500',
        },
        {
            id: '103',
            title: 'Contest',
            score: '300',
        },
        {
            id: '105',
            title: 'Contest',
            score: '200',
        },
        // More people...
    ];
    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2  sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow  border-b border-gray-200 ">
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contest
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Score
                  </th>
                </tr>
              </thead> */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {people.map(person => (
                                        <tr key={person.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{person.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{person.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {person.score}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
