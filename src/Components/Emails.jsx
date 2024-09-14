import { useEffect, useState, useMemo } from 'react';
import Email from './Email';
import useGetAllEmails from '../hooks/useGetAllEmails';
import { useSelector } from 'react-redux';

const Emails = () => {
  useGetAllEmails();
  const { emails, searchText } = useSelector((store) => store.app);
  const [filterEmail, setFilterEmail] = useState([]);

  useEffect(() => {
    if (emails?.length) {
      const filteredEmail = emails.filter((email) => {
        const search = searchText.toLowerCase();
        return (
          email.subject.toLowerCase().includes(search) ||
          email.to.toLowerCase().includes(search) ||
          email.message.toLowerCase().includes(search)
        );
      });
      setFilterEmail(filteredEmail);
    }
  }, [searchText, emails]);

  // Memoize the filtered emails
  const memoizedFilteredEmails = useMemo(() => filterEmail, [filterEmail]);

  return (
    <div>
      {memoizedFilteredEmails.length > 0 ? (
        memoizedFilteredEmails.map((email) => <Email key={email._id} email={email} />)
      ) : (<p>No emails found matching your search.</p>
      )}
    </div>
  );
};

export default Emails;
