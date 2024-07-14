
import { CollectionCard } from '@/components/CollectionCard/CollectionCard';
import {
    SimpleGrid,
    Divider,
} from '@mantine/core';
// import { LibraryInfo } from '@/components/LibraryInfo/LibraryInfo';
import { ProfileCardLibrary,
    ProfileCardDataType
 } from '@/components/ProfileCard/ProfileCard';

const data: ProfileCardDataType = {
    "name": "Susan",
    "description": "Loves everything about plants",
    "avatar": "https://unsplash.com/photos/11GZVrMzfUU/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGtpZHxlbnwwfHx8fDE3MTk5OTg3MDV8MA&force=true&w=640",
    "user_id": "1",
    "location": "New York",
    "create_count": 12,
    "read_count": 12,
    "total_book_count": 84,
    "collection_count": 12,
}
// each user can only have one library
export default function LibraryPage({
    params:{user_id}}: {params:{user_id: string}}
) {
    console.log(user_id)
    return (

        <div className=''>
            <div className='sm:ml-8'>
            <ProfileCardLibrary profileData={data} />

            </div>
                  <Divider my="sm" />

            <div className='mt-12'>
                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={{ base: 10, sm: 'xl' }}
                    verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                </SimpleGrid>
            </div>
        </div>
    );
}